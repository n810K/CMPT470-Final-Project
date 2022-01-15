import { Server, Socket } from "socket.io"

import { v4 as uuid } from "uuid"
import { Room, RoomState } from "../types"

export default (io: Server, socket: Socket, rooms: Map<string, Room>) => {
  const updateRooms = () => {
    const roomsArray = Array.from(rooms.values()).filter(
      (room) => room.state == RoomState.readyUp
    )

    io.emit("updateRooms", roomsArray)
  }

  const createRoom = (roomName: string) => {
    const id = uuid()
    rooms.set(id, {
      roomName,
      rounds: 5,
      roundsPlayed: 0,
      players: [],
      id,
      capacity: 4,
      time: 3,
      isTimerStarted: false,
      state: RoomState.readyUp,
    })
  }

  if (rooms.size == 0) {
    createRoom("Default Room")
  }

  socket.on("createRoom", (roomName) => {
    createRoom(roomName)
    updateRooms()
  })

  socket.on("browseRooms", () => {
    updateRooms()
  })
}
