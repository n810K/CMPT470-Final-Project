import "../rooms/style.css"
import React, { useState, useEffect } from "react"

const Chat = ({ socket }) => {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])

  const sendData = () => {
    if (text !== "") {
      socket.emit("createMessage", text)
      setText("")
    }
  }

  useEffect(() => {
    socket.on("message", (data) => {
      let temp = messages
      temp.push({
        userId: data.userId,
        name: data.name,
        text: data.text,
        time: data.time,
      })
      setMessages([...temp])
    })
  }, [socket, messages])

  return (
    <div id="chat_page">
      <div className="chat-container">
        <header className="chat-header">
          <h1>Chat</h1>
        </header>
        <div className="chat-messages">
          {messages.map((m, i) => {
            return (
              <div key={i} className="message">
                <p className="meta">
                  {m.name} <span>{m.time}</span>
                </p>
                <p className="text"> {m.text}</p>
              </div>
            )
          })}
        </div>
        <div className="chat-form-container">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendData()
              }
            }}
          />
          <button onClick={sendData} className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </div>
      </div>
    </div>
  )
}
export default Chat
