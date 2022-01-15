import React, { useState } from "react"
import "../room/ReadyUp.css"
import "../rooms/style.css"

const ReadyUp = ({ players, socket, roomId, userName }) => {
  const [isReady, setIsReady] = useState(false)

  const setReady = (isReady) => {
    setIsReady(isReady)
    socket.emit("ready", { isReady, roomId: roomId, userName })
  }

  const areAllReady = () => players.every((player) => player.isReady)

  const startGame = () => {
    socket.emit("startGame")
    socket.emit("setTimer", 4) 
  }

  return (

    <div id="ReadyUp_page">
      <div id="waiting_content">
        <h1 className="game_title">Get Ready</h1>
        <div id="player_content">
          <div id="player">
            <h2>Players</h2>
          </div>
           
          <section id="readyup_players">
            <p>
              <span style={{color: "green"}}>Green</span> = ready to play
            </p>
            <p>
              <span style={{color: "red"}}>Red</span> = NOT ready yet
            </p>
            {players.map((player) => (
            <h2 id="player_name" style={{ color: player.isReady ? "green" : "red" }}>
              {player.name}
            </h2>
          ))}
          </section>
        </div>

        <section id="ready_btn_section">
          {isReady ? (
            <button id="ready_btn" onClick={() => setReady(false)}>
              Not Ready
            </button>
          ) : (
            <button id="ready_btn" onClick={() => setReady(true)}>
              Ready
            </button>
          )}
          {areAllReady() ? <button id="start_btn" onClick={startGame}>Start Game</button> : null}
        </section>
      </div>
    </div>

  )
}

export default ReadyUp
