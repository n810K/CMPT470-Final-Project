import React, { Fragment, useEffect, useState } from "react"
import { toast } from "react-toastify"
import "../room/Trivia.css"

const Trivia = ({ socket, room: { players, rounds, roundsPlayed } }) => {
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState("unselected")
  const [gameText, setGameText] = useState("Game Starting in")
  const [inputText, setInputText] = useState("")
  const [{ type, question, answers, id }, setQuestion] = useState({
    type: 0,
    question: "",
    answers: [],
    id: "",
  })
  const [time, setTime] = useState("3")

  useEffect(() => {
    socket.on("timer", (countdown) => {
      setTime(countdown)
    })
  }, [socket])

  useEffect(() => {
    socket.on("gameOver", () => {
      setGameText("Game Over")
      setTime("!")
    })
  }, [socket])

  useEffect(() => {
    socket.on("updateQuestion", (t) => {
      setQuestion(t)
      setIsCorrect(false)
      setHasAnswered(false)
      setGameText("Next Question in")
    })
  }, [socket])

  // for word question
  const answerWordQuestion = () => {
    socket.emit("answerWordQuestion", { answer: inputText, questionId: id })
  }

  useEffect(() => {
    socket.on("giveCorrectWordAnswer", (answers) => {
      setIsCorrect(answers.includes(inputText))
      setHasAnswered(true)
      setInputText("")
    })
  }, [socket, setIsCorrect, setHasAnswered, inputText])

  // for multiple choice
  const getCorrectIndex = (i) => {
    socket.emit("getCorrectIndex", {
      questionId: id,
      playerAnswer: i,
    })
    setSelectedIndex(i)
  }

  useEffect(() => {
    socket.on("correctIndexIs", (index) => {
      if (selectedIndex === index.correct) {
        setIsCorrect(true)
      } else if (selectedIndex !== "unselected") {
        setIsCorrect(false)
      }
      setHasAnswered(true)
    })
  }, [socket, hasAnswered, selectedIndex])

  return (
    <div id="trivia_page">
      <header>
        <h1 id="count_down">
          {gameText} <br /> <br /> {time}
        </h1>
        <br />
      </header>

      <div id="middle_row">
        <div id="trivia_container">
          <h2>
            Question {roundsPlayed}/{rounds}
          </h2>
          <p id="triv_question">
            <b>Question: </b>
            {question}
          </p>
          <br />

          {type === 0 ? (
            <Fragment>
              <p id="trivia_instruct">
                Select the tile with the correct answer.
              </p>

              <section id="answer_options">
                {answers.map((answer, i) => (
                  <button
                    id="answer_option_btns"
                    key={i}
                    onClick={() => getCorrectIndex(i)}
                  >
                    {answer}
                  </button>
                ))}
              </section>
            </Fragment>
          ) : (
            <Fragment>
              <p id="trivia_instruct">
                Type the correct answer as a single word.
              </p>
              <input
                type="text"
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                disabled={hasAnswered}
              />
              <button onClick={answerWordQuestion} disabled={hasAnswered}>
                Submit!
              </button>
            </Fragment>
          )}
          {hasAnswered ? (
            isCorrect ? (
              <p style={{ color: "green", fontFamily: "Happy Monkey" }}>
                {" "}
                <b>Correct!</b>
              </p>
            ) : (
              <p style={{ color: "red", fontFamily: "Happy Monkey" }}>
                {" "}
                <b>Wrong Answer</b>
              </p>
            )
          ) : null}
        </div>

        <div id="triv_rank_list">
          <h2>Ranking</h2>

          <section id="triv_display_points">
            <ol id="leadboard_names">
              <li
                id="player_subheader"
                style={{ color: "blue", fontFamily: "Arial" }}
              >
                <b>Player</b>
              </li>
              {players
                .sort(
                  (player1, player2) => player1.numCorrect < player2.numCorrect
                )
                .map((player, i) => (
                  <li key={i}>
                    <b
                      style={{
                        textDecoration: player.hasAnswered
                          ? "underline"
                          : "none",
                      }}
                    >
                      {player.name}
                    </b>
                  </li>
                ))}
            </ol>

            <ol id="scores">
              <li
                id="score_subheader"
                style={{ color: "blue", fontFamily: "Arial" }}
              >
                <b>Points</b>
              </li>
              {players
                .sort(
                  (player1, player2) => player1.numCorrect < player2.numCorrect
                )
                .map((player, i) => (
                  <li key={i}>
                    <b>{player.numCorrect}</b>
                  </li>
                ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Trivia
