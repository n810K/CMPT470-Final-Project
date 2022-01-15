import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import loginRoute from "./routes/register/login"
import registerRoute from "./routes/register/register"
import verifiedRoute from "./routes/register/verified"
import triviaRoute from "./routes/trivia/trivia"
import dashboardRoute from "./routes/dashboard/dashboard"
import leaderBoardRoute from "./routes/leaderboard/leaderboard"
import lobbyRoute from "./routes/history/history"

import registerRoomsHandlers from "./game/rooms"
import registerRoomHandlers from "./game/room"
import userRoute from "./routes/user/user"
import { Room, RoomState } from "./types"
import { v4 as uuid } from "uuid"
import { instrument } from "@socket.io/admin-ui"

const app = express()

// middleware
app.use(express.json()) //req.body
app.use(cors())

// routes
app.use("/auth", loginRoute)
app.use("/auth", registerRoute)
app.use("/auth", verifiedRoute)
app.use("/trivia", triviaRoute)
app.use("/dashboard", dashboardRoute)
app.use("/history", lobbyRoute)
app.use("/user", userRoute)
app.use("/leaderboard", leaderBoardRoute)

app.get("/", (req, res) => {
  res.status(200).send("Trivia Project")
})

// configure socket communication
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://admin.socket.io",
      "http://localhost:8080",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
})

const rooms = new Map<string, Room>()

// add chat messages to socket communication
const onConnection = (socket: Socket) => {
  registerRoomsHandlers(io, socket, rooms)
  registerRoomHandlers(io, socket, rooms)
}

io.on("connection", onConnection) // registers socket logice

httpServer.listen(5000, () => {
  console.log("Server is running on port 5000")
})

instrument(io, {
  namespaceName: "/socketAdmin",
  auth: false,
})
