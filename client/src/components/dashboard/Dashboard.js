import React, { Fragment, useState, useEffect } from "react"
import "../dashboard/dashboard.css"
import Navbar from "../../components/navbar/navbar"
import TrickQuestion from "../../components/trickQuestion/trickQuestion"
import GlobalLeaderboard from "../globalLeaderboard/GlobalLeaderboard"

const Dashboard = ({ status }) => {
  const [name, setName] = useState("")
  const [ranking, setRanking] = useState([])
  const userName = async () => {
    try {
      const invokeUrl = "http://localhost:5000/dashboard/"
      const response = await fetch(invokeUrl, {
        //token is saved inside localStorage
        //to view localstorage, on ur browser open the console and click on the storage tab.
        headers: { token: localStorage.token },
      })
      const parse = await response.json()
      setName(parse.name)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    userName()
  })

  const rank = async () => {
    try {
      const url = "http://localhost:5000/leaderboard/ranking"
      const response = await fetch(url)
      const parsed = await response.json()
      setRanking(parsed)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => rank(), [])

  const [{ question, answers, id }, setQuestion] = useState({
    question: "",
    answers: [],
    id: "",
  })

  const getRandomQuestion = async () => {
    try {
      const url = "http://localhost:5000/trivia/question/random"
      const response = await fetch(url)
      const parsed = await response.json()
      setQuestion(parsed)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => getRandomQuestion(), [])

  return (
    <Fragment>
      <div id="dashboard_page">
        <nav id="nav_bar">
          <Navbar status={status} />
        </nav>

        <main id="dashboard_body">
          <div id="welcome_user">
            <i className="far fa-user fa-5x"></i>
            <h2>Welcome, {name}</h2>
          </div>

          <div id="game_instructions">
            <h2>Game Instructions</h2>
            <div id="steps_to_play">
              <section id="step_header">
                <h3 id="number">1</h3>
                <h3 id="subtitle_instruct">Join Game Room</h3>

                <div id="step_info">
                  <h4>Existent Game Rooms</h4>
                  <p>
                    Choose a game room and join by clicking the join button. The
                    capacity and room name will be displayed. Each game room can
                    only have a maximum of 4 players.
                  </p>
                  <h4>Create Your Room</h4>
                  <p>
                    Input a customized name for your game room. Click{" "}
                    <em>OK</em> and your newly created game room will appear
                    under the list of Existent game rooms.
                  </p>
                </div>

                <section id="step">
                  <p>
                    Players can chat with other players in the game using the
                    chat box, available steps 2 to 4.
                  </p>
                </section>

                <h3 id="number">2</h3>
                <h3 id="subtitle_instruct">Get Ready</h3>
                <p id="step_info">
                  Click the ready button to signify to all other players that
                  you are prepared to play. All players in the same game room
                  must be in ready state before the game can begin. Once all
                  players are in the ready state, a “Start game” button will be
                  presented.
                </p>

                <h3 id="number">3</h3>
                <h3 id="subtitle_instruct">Answer Questions</h3>

                <p id="step_info">
                  Players must answer the questions in a timely manner. There
                  will be a timer displayed. Each question will be displayed one
                  at a time, and the player must choose a tile with a
                  corresponding correct answer. Players can only choose 1 answer
                  per question, no change of minds allowed, the first answer
                  selection will be counted. Once the player selects an answer,
                  the game will display either “Correct” or “Wrong Answer”.
                  Players will receive 1 point for each correctly answered
                  question. These points will be reflected in real-time on the
                  local leaderboard ranking.
                </p>

                <h3 id="number">4</h3>
                <h3 id="subtitle_instruct">Game Over</h3>

                <p id="step_info">
                  Each player in the game will be ranked by the number of points
                  collected in the current game.
                </p>
              </section>
            </div>
          </div>

          <GlobalLeaderboard leaders={ranking} />
          <TrickQuestion />
          <div id="social_media">
            <h2 id="social_media_h2">Share to Social Media</h2>
            <section id="social_info">
              <p>Let your friends hear about us!</p>
              <section id="social_media_icons">
                <i className="fab fa-twitter-square fa-5x"></i>
                <i className="fab fa-instagram fa-5x"></i>
                <i className="fab fa-facebook-square fa-5x"></i>
              </section>
            </section>
          </div>
        </main>
      </div>
    </Fragment>
  )
}

export default Dashboard
