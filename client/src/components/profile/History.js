import React from "react"
import { Fragment } from "react"
import "../profile/History.css"

const History = ({ history }) => {
  const historyData = () => {
    return history.data.map((item, index) => {
      const { player_list, winner, timestamp, name } = item
      var d = new Date(parseFloat(timestamp))
      var iso = d
        .toISOString()
        .match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)

      return (
        <tr className="table_th" key={index}>
          <td className="table_th">{name}</td>
          <td className="table_th">
            {player_list.map((player, i) => {
              return <p>{player}</p>
            })}
          </td>
          <td className="table_th">{winner}</td>
          <td className="table_th">{iso[1] + " " + iso[2]}</td>
        </tr>
      )
    })
  }

  return (
    <Fragment>
      <div id="history_section">
        <h1 id="history_title">Match History</h1>
        <table id="headers_table">
          <tr>
            <th className="table_th">
              <b>Room Name</b>
            </th>
            <th className="table_th">
              <b>Players</b>
            </th>
            <th className="table_th">
              <b>Winner</b>
            </th>
            <th className="table_th">
              <b>Timestamp</b>
            </th>
          </tr>
          {historyData()}
        </table>
      </div>
    </Fragment>
  )
}

export default History
