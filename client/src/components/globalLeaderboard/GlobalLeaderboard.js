import React from "react"

const GlobalLeaderboard = ({ leaders }) => {
  const leadersData = () => {
    return leaders.map((item, index) => {
      const { name } = item

      return <li key={index}>{name}</li>
    })
  }
  const eloData = () => {
    return leaders.map((item, index) => {
      const { elo } = item

      return <li key={index}>{elo}</li>
    })
  }

  return (
    <div id="global_leadboard">
      <h2>Global ELO Leaderboard</h2>
      <ul id="leadboard_names">
        <li
          id="player_subheader"
          style={{ color: "blue", fontFamily: "Arial" }}
        >
          <b>Player:</b>
        </li>
        {leadersData()}
      </ul>
      <ul id="scores">
        <li id="score_subheader" style={{ color: "blue", fontFamily: "Arial" }}>
          <b>Points:</b>
        </li>
        {eloData()}
      </ul>
    </div>
  )
}

export default GlobalLeaderboard
