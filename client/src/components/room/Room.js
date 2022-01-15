import React, { useEffect, useState } from "react"
import Trivia from "./Trivia"
import Chat from "./Chat"
import ReadyUp from "./ReadyUp"
import End from "./End"
import Navbar from "../../components/navbar/navbar"
import "../room/room.css"

const roomStateEnum = {
  none: 0,
  readyUp: 1,
  trivia: 2,
  end: 3,
}

const Room = ({ socket, status }) => {
  const [room, setRoom] = useState({
    players: [],
    id: "",
    capacity: 0,
    rounds: 0,
    roundsPlayed: 0,
    time: 0,
    isTimerStarted: false,
    state: roomStateEnum.none,
  })

  useEffect(() => {
    socket.emit("sendUpdate")
    socket.on("updateRoom", (room) => {
      setRoom(room)
    })
    return () => socket.emit("leaveRoom")
  }, [socket, setRoom])

  return (
    <div>
      <nav className="create_navbar">
        <Navbar status={status} />
      </nav>
      <div id="room_content">
        {room.state === roomStateEnum.readyUp ? (
          <ReadyUp socket={socket} players={room.players} />
        ) : null}
        {room.state === roomStateEnum.trivia ? (
          <Trivia socket={socket} room={room} />
        ) : null}
        {room.state === roomStateEnum.end ? (
          <End socket={socket} room={room} />
        ) : null}
        <Chat socket={socket} players={room.players} roomName={room.roomName} />
      </div>
    </div>
  )
}

export default Room
