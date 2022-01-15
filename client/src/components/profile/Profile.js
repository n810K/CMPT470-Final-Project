import React from "react"
import { Fragment, useState, useEffect } from "react"
import "../profile/Profile.css"
import History from "./History"
import Navbar from "../../components/navbar/navbar"

const Profile = ({ status }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    elo: "",
  })
  const [history, setHistory] = useState({
    data: [],
  })
  const userInformation = async () => {
    try {
      const invokeUrl = "http://localhost:5000/dashboard/"
      const response = await fetch(invokeUrl, {
        //token is saved inside localStorage
        //to view localstorage, on ur browser open the console and click on the storage tab.
        headers: { token: localStorage.token },
      })
      const parse = await response.json()
      setUserInfo({
        name: parse.name,
        email: parse.email,
        elo: parse.elo,
      })
      const invokeUrl2 = `http://localhost:5000/history/matchPlayer/${parse.name}`
      const response2 = await fetch(invokeUrl2, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const parsed = await response2.json()
      setHistory({
        data: parsed,
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    userInformation()
  }, [])
  return (
    <Fragment>
      <div>
        <nav className="create_navbar">
          <Navbar status={status} />
        </nav>

        <main className="profile_contents">
          <h1 id="profile_title">My Profile</h1>
          <table id="user_info_table">
            <tr>
              <td>
                <b>Name:</b>
              </td>
              <td>{userInfo.name}</td>
            </tr>
            <tr>
              <td>
                <b>Email:</b>
              </td>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <td>
                <b>Total Elo Points:</b>
              </td>
              <td>{userInfo.elo}</td>
            </tr>
          </table>

          <section id="left_profile_section">
            <i className="far fa-user fa-5x"></i>
            <h2>{userInfo.name}</h2>
            <q>
              <em>Quote of the day is to find the bright side of things.</em>
            </q>
            <p>
              <b>- Mystery Person</b>
            </p>
          </section>
        </main>
      </div>
      <History name={userInfo.name} history={history} />
    </Fragment>
  )
}

export default Profile
