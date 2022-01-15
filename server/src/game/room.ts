import { Player, Room, RoomState } from "../types"
import { Server, Socket } from "socket.io"
import moment from "moment"
import pool from "../db/db"
import eloSystem from "../utils/eloSystem"

const formatMessage = (name: string, text: string) => ({
  name,
  text,
  time: moment().format("h:mm a"),
})

const getCorrectIndex = async (id: string) => {
  try {
    const r = await pool.query(
      `
      SELECT correct
      FROM questions
      WHERE id = $1
      `,
      [id]
    )
    return r.rows[0]
  } catch (error) {
    console.log(error)
  }
}

const getAnswers = async (id: string) => {
  try {
    const r = await pool.query(
      `
      SELECT answers
      FROM questions
      WHERE id = $1
      `,
      [id]
    )
    return r.rows[0].answers as string[]
  } catch (error) {
    console.error(error)
  }
}

const getRandomTrivia = async () => {
  try {
    const result = await pool.query(
      `
      SELECT type, id, question, answers
      FROM questions
      ORDER BY RANDOM()
      LIMIT 1
      `
    )
    return result.rows[0]
  } catch (error) {
    console.log(error)
  }
}

const updateElo = async (players: Player[]) => {
  try {
    const playerElos = {}
    players = players.sort((player1, player2) =>
      player1.numCorrect < player2.numCorrect ? 1 : -1
    )

    for (let i = 0; i < players.length; i++) {
      const player = players[i]
      const getElo_query = await pool.query(
        `
        SELECT elo
        FROM users
        WHERE name = $1
        `,
        [player.name]
      )
      let initialElo = getElo_query.rows[0].elo
      playerElos[player.name] = initialElo
    }
    for (let i = 0; i < players.length; i++) {
      const player = players[i]
      let newElo: number = eloSystem(
        player.name,
        i + 1,
        playerElos[player.name],
        Object.values(playerElos)
      )
      const updateElo_query = await pool.query(
        `
        UPDATE users
        SET elo = $1
        WHERE name = $2
        `,
        [newElo, player.name]
      )
    }
  } catch (error) {
    console.log(error)
  }
}

const botName = "Bot"

export default (io: Server, socket: Socket, rooms: Map<string, Room>) => {
  socket.on(
    "joinRoom",
    ({ userName, roomId }: { userName: string; roomId: string }) => {
      const updateRoom = () =>
        io.to(roomId).emit("updateRoom", rooms.get(roomId))
      const getPlayer = () =>
        rooms.get(roomId).players.find((player) => player.name === userName)

      const endGame = async () => {
        rooms.get(roomId).state = RoomState.end
        await updateElo(rooms.get(roomId).players)
        updateRoom()
      }
      const haveAllUsersAnswered = () => {
        const players = rooms.get(roomId).players
        return players.every((player) => player.hasAnswered)
      }

      let gameTimer

      // based on https://github.com/nathan-08/socket-io-countdown-timer/blob/master/public/index.html
      const timer = (time: number) => {
        if (!rooms.get(roomId).isTimerStarted) {
          rooms.get(roomId).isTimerStarted = true
          rooms.get(roomId).time = time
          gameTimer = setInterval(() => {
            rooms.get(roomId).time--
            if (rooms.get(roomId).time <= 0) {
              if (rooms.get(roomId).time < 0) {
                clearInterval(gameTimer)
                rooms.get(roomId).isTimerStarted = false
                io.to(roomId).emit("timer", 10)
                emitNewQuestion()
                updateRoom()
              } else {
                io.to(roomId).emit("timer", 0)
              }
            } else {
              io.to(roomId).emit("timer", rooms.get(roomId).time)
            }
          }, 1000)
        }
      }

      const emitNewQuestion = async () => {
        let room = rooms.get(roomId)
        if (room.roundsPlayed < room.rounds) {
          room.roundsPlayed++
          let players = rooms.get(roomId).players
          players.map((a) => (a.hasAnswered = false))
          const trivia = await getRandomTrivia()
          io.to(roomId).emit("updateQuestion", trivia)
          timer(10)
        } else {
          endGame()
        }
      }

      const playerLeave = () => {
        const room = rooms.get(roomId)
        room.players = room.players.filter((player) => player.name != userName)
        io.to(roomId).emit(
          "message",
          formatMessage(botName, `A ${userName} has left the chat`)
        )
        updateRoom()
      }

      rooms.get(roomId).players.push({
        name: userName,
        numCorrect: 0,
        hasAnswered: false,
        isReady: false,
      })

      socket.join(roomId)

      io.emit(
        "updateRooms",
        Array.from(rooms.values()).filter(
          (room) => room.state == RoomState.readyUp
        )
      )

      socket.emit(
        "message",
        formatMessage(botName, "Welcome to the quiz room!")
      )

      socket.broadcast
        .to(roomId)
        .emit(
          "message",
          formatMessage(botName, `${userName} has joined the chat`)
        )

      updateRoom()

      socket.on("ready", ({ isReady }) => {
        getPlayer().isReady = isReady
        updateRoom()
      })

      socket.on("createMessage", (msg) => {
        io.to(roomId).emit("message", formatMessage(userName, msg))
        if (msg === "pause") {
          clearInterval(gameTimer)
        }
      })

      socket.on("sendUpdate", () => {
        io.to(roomId).emit("updateRoom", rooms.get(roomId))
      })

      // for multiple choice
      socket.on("getCorrectIndex", async ({ questionId, playerAnswer }) => {
        const player = getPlayer()
        if (player.hasAnswered || rooms.get(roomId).time <= 0) {
          socket.emit("alreadyAnswered")
        } else {
          player.hasAnswered = true
          const index = await getCorrectIndex(questionId)
          if (playerAnswer === index.correct) {
            player.numCorrect = player.numCorrect + 1
          }
          if (haveAllUsersAnswered()) {
            io.to(roomId).emit("correctIndexIs", index)
            updateRoom()
          }
        }
      })

      // for word question
      socket.on("answerWordQuestion", async ({ answer, questionId }) => {
        const player = getPlayer()
        if (player.hasAnswered || rooms.get(roomId).time <= 0) {
          socket.emit("alreadyAnswered")
        } else {
          player.hasAnswered = true
          const answers = await getAnswers(questionId)
          const isCorrect = answers.includes(answer)
          if (isCorrect) {
            player.numCorrect = player.numCorrect + 1
          }
          if (haveAllUsersAnswered()) {
            io.to(roomId).emit("giveCorrectWordAnswer", answers)
            updateRoom()
          }
        }
      })

      socket.on("startGame", () => {
        rooms.get(roomId).state = RoomState.trivia
        timer(4)
        updateRoom()
      })
      socket.on("setTimer", (time) => {
        timer(time)
      })

      socket.on("leaveRoom", () => {
        playerLeave()
        updateRoom()
        socket.leave(roomId)
        socket
          .removeAllListeners("createMessage")
          .removeAllListeners("ready")
          .removeAllListeners("sendUpdate")
          .removeAllListeners("getCorrectIndex")
          .removeAllListeners("startGame")
          .removeAllListeners("setTimer")
          .removeAllListeners("leaveRoom")
          .removeAllListeners("disconnect")
          .removeAllListeners("answerWordQuestion")
      })

      socket.on("disconnect", () => {
        playerLeave()
        updateRoom()
      })
    }
  )
}
