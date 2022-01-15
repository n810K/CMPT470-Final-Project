import { Fragment, useState, useEffect } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { io } from "socket.io-client"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Dashboard from "./components/dashboard/Dashboard"
import Registration from "./components/register/Registration"
import Trivia from "./components/trivia/Trivia"
import Rooms from "./components/rooms/Rooms"
import CreateQ from "./components/create/CreateQ"
import Room from "./components/room/Room"
import Profile from "./components/profile/Profile"
import Create from "./components/create/Create"
import CreateTF from "./components/create/CreateTF"
import CreateWord from "./components/create/CreateWord"
// notifcations using toastify
// https://www.npmjs.com/package/react-toastify
toast.configure()
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [socket, setSocket] = useState(null)
  const [userName, setUserName] = useState("")

  const status = (boolean) => {
    setIsAuthenticated(boolean)
  }

  useEffect(() => {
    const newSocket = io(`http://localhost:5000`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  // check user status to see if they have verified their login credentials
  const checkUserStatus = async () => {
    try {
      // send request to /auth/verified/ to check credentials
      const invokeUrl = "http://localhost:5000/auth/verified"
      const response = await fetch(invokeUrl, {
        headers: { token: localStorage.token },
      })
      const parse = await response.json()

      parse === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    checkUserStatus()
  }, [])

  const getUserName = async () => {
    try {
      const invokeUrl = "http://localhost:5000/dashboard/"
      const response = await fetch(invokeUrl, {
        //token is saved inside localStorage
        //to view localstorage, on ur browser open the console and click on the storage tab.
        headers: { token: localStorage.token },
      })
      const parse = await response.json()
      setUserName(parse.name)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUserName()
  }, [])

  return (
    <Fragment>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="" element={<Home />} />
          </Routes>
          <Routes>
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <Registration status={status} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login status={status} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard status={status} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>

          <Routes>
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile status={status} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/trivia"
              element={
                isAuthenticated ? (
                  <Trivia socket={socket} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/rooms"
              element={
                isAuthenticated ? (
                  <Rooms socket={socket} status={status} userName={userName} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/room/:room"
              element={
                isAuthenticated ? (
                  <Room socket={socket} status={status} userName={userName} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/create"
              element={
                isAuthenticated ? (
                  <Create status={status} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/create/mc"
              element={
                isAuthenticated ? (
                  <CreateQ status={status} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/create/tf"
              element={
                isAuthenticated ? (
                  <CreateTF status={status} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/create/word"
              element={
                isAuthenticated ? (
                  <CreateWord status={status} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  )
}

export default App
