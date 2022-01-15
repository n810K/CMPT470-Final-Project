import React, { useEffect, useState } from "react"
// import "./style.css"
import "../rooms/rooms.css"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Navbar from "../../components/navbar/navbar"

const Rooms = ({ socket, status }) => {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const [roomName, setRoomName] = useState("")
  const [userName, setUserName] = useState("")

  const getUserName = async () => {
    try {
      const invokeUrl = "http://localhost:5000/dashboard/"
      const response = await fetch(invokeUrl, {
        headers: { token: localStorage.token },
      })
      const parse = await response.json()
      setUserName(parse.name)
    } catch (error) {
      console.log(error)
    }
  }

  const createRoom = (e) => {
    e.preventDefault()
    if (rooms.some((r) => r.roomName === roomName) === true) {
      toast.error("room name already exists")
      setRoomName("")
    } else {
      socket.emit("createRoom", roomName)
      setRoomName("")
    }
  }

  const joinRoom = (roomId) => {
    if (userName.length !== 0) {
      socket.emit("joinRoom", { userName, roomId })
      navigate(`/room/${roomId}/`)
    }
  }

  useEffect(() => {
    socket.emit("browseRooms")
    getUserName()
  }, [socket])

  useEffect(() => {
    socket.on("updateRooms", (lobbies) => {
      setRooms(lobbies)
    })
  }, [socket, setRooms])

  return (
    <div className="join-container">
      <nav className="create_navbar">
        <Navbar status={status} />
      </nav>
      <section id="new_rooms_page">
        <h1 id="game_room_title">Game Rooms</h1>

        <div id="room_info_table_container">
          <h2 id="available_rooms">Available Rooms</h2>
          <table  id="room_info_table">
            <tbody>
              <tr>
                <th id="add_gap">Room Name</th>
                <th id="add_gap">Capacity</th>
              </tr>
              {rooms.map((room, i) => (
                <tr id="room_info_table_data" key={i}>
                  <td>{room.roomName}</td>
                  <td>
                    {room.players.length}/{room.capacity}
                  </td>
                  <td>
                    <button className="btn" onClick={() => joinRoom(room.id)}>
                      join
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div id="create_room_table_container">
          <h2>Create a Room</h2>
          <table id="create_room_table">
            <tbody>
              <tr>
                <td>
                  <form onSubmit={createRoom}>
                    {/* <label>Enter room name: </label> */}
                    {/* <td> */}
                      <input
                        id="team_name"
                        type="text"
                        name="name_field"
                        onChange={(event) => {
                          setRoomName(event.target.value)
                        }}
                        placeholder={"Enter Room Name"}
                        value={roomName}
                        required={true}
                      />
                    {/* </td> */}
                    <input className={"btn"} type="submit" value="OK" />
                  </form>
                </td>
              </tr> 
            </tbody>
          </table>           
        </div>
 
      </section>

    </div>
  )
}

export default Rooms
