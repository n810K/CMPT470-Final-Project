import React, { Fragment, useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import "../room/End.css"

const End = ({ room: { players, roomName, id } }) => {
  const [updatedElo, setUpdatedElo] = useState({})

  const recordLobby = async () => {
    const winner = []
    winner.push(
      players.reduce((p, c) => (p.numCorrect > c.numCorrect ? p : c)).name
    )
    const player_list = []
    var i = 0
    players.forEach((player) => {
      player_list[i] = player.name
      i++
    })

    const params = { player_list, winner, roomName, id }

    try {
      const invokeUrl = "http://localhost:5000/history/match"
      const response = await fetch(invokeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
      const parse = await response.json()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(async () => {
    try {
      const invokeUrl = "http://localhost:5000/dashboard/"
      const response = await fetch(invokeUrl, {
        headers: { token: localStorage.token },
      })
      const parse = await response.json()
      const name = parse.name

      const query_url = "http://localhost:5000/user/getElo/"
      let playersElosUpdated = {}
      const sorted_array = players.sort(
        (player1, player2) => player1.numCorrect < player2.numCorrect
      )

      for (let i = 0; i < players.length; i++) {
        const response = await fetch(query_url + players[i].name, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        let jsondata = await response.json()

        playersElosUpdated[players[i].name] = jsondata.elo
      }
      setUpdatedElo({ ...playersElosUpdated })
    } catch (error) {
      console.log(error)
    }
    recordLobby()
  }, [])

  return (
    <Fragment>
      <div id="End_page">
        <h1 id="game_over_header">Game Over</h1>
        <main id="rank_list">
          <h2 id="rank_list_title">Ranking</h2>

          <section id="display_points">
            <ol>
              <li
                style={{ color: "blue", fontFamily: "Arial" }}
              >
                <b>Elo</b>
              </li>
              {players
                .sort(
                  (player1, player2) => player1.numCorrect < player2.numCorrect
                )
                .map((player, i) => (
                  <li id="rank_table_data" key={i}>
                    <b>{updatedElo[player.name]}</b>
                  </li>
                ))}
            </ol>
            <ol>
              <li
                style={{ color: "blue", fontFamily: "Arial" }}
              >
                <b>Player</b>
              </li>
              {players
                .sort(
                  (player1, player2) => player1.numCorrect < player2.numCorrect
                )
                .map((player, i) => (
                  <li id="rank_table_data" key={i}>
                    <b>{player.name}</b>
                  </li>
                ))}
            </ol>

            <ol>
              <li
                style={{ color: "blue", fontFamily: "Arial" }}
              >
                <b>Points</b>
              </li>
              {players
                .sort(
                  (player1, player2) => player1.numCorrect < player2.numCorrect
                )
                .map((player, i) => (
                  <li id="rank_table_data" key={i}>
                    <b>{player.numCorrect}</b>
                  </li>
                ))}
            </ol>
          </section>

          <section id="home_btn_section">
            <Link to="/dashboard">
              <button id="home_btn">Go Home</button>
            </Link>
          </section>

        </main>
      </div>
    </Fragment>
  )
}

export default End
