import React, { useEffect, useState } from "react"
import "../chat/style.css"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/navbar"

function LobbyStub({ socket }) {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("JavaScript")
  const navigate = useNavigate()

  const userName = async () => {
    try {
      const invokeUrl = "http://localhost:5000/dashboard/"
      const response = await fetch(invokeUrl, {
        //token is saved inside localStorage
        //to view localstorage, on ur browser open the console and click on the storage tab.
        headers: { token: localStorage.token },
      })
      const parse = await response.json()
      setUsername(parse.user_name)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    userName()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    socket.emit("joinRoom", { username, room })
    navigate(`/chat/${room}/`)
  }

  return (
    <div id="create_question_page">
      <nav id="create_page_navbar">
        <Navbar />
      </nav>
      <div className="join-container">
        <header className="join-header">
          <h1>
            <i className="fas fa-smile"></i> ChatCord
          </h1>
        </header>
        <main className="join-main">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="room">Room</label>
              <select
                name="room"
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="PHP">PHP</option>
                <option value="C#">C#</option>
                <option value="Ruby">Ruby</option>
                <option value="Java">Java</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Join Chat
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default LobbyStub
