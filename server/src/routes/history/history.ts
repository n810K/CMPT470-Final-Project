import pool from "../../db/db"
import { Router } from "express"

const router = Router()
// insert new match into database
router.post("/match", async (request, respond) => {
  try {
    const { player_list, winner, roomName, id } = request.body
    const timestamp = Date.now()
    const newmatch = await pool.query(
      "INSERT INTO lobbies(id, player_list, winner, timestamp, name) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING",
      [id, player_list, winner, timestamp, roomName]
    )
  } catch (error) {
    console.log(error.message)
    respond.status(500).json("Internal Server Error")
  }
})

// give user data on all lobbies
router.get("/matches", async (request, respond) => {
  try {
    const matches = await pool.query("SELECT * FROM lobbies")
    if (matches.rows.length === 0) {
      return respond.status(404).json("No lobbies")
    }

    respond.json(matches.rows)
  } catch (error) {
    console.log(error)
    return respond.status(500).json("Internal Server Error")
  }
})

// give user all match information for specific match
router.get("/match/:matchId", async (request, respond) => {
  try {
    const id = request.params.matchId
    const match = await pool.query("SELECT * FROM lobbies WHERE id = $1", [id])
    if (match.rows.length === 0) {
      return respond.status(404).json("No lobbies")
    }
    respond.json(match.rows[0])
  } catch (error) {
    return respond.status(500).json("Internal Server Error")
  }
})

// give user player list of specific match
router.get("/matchPlayerList/:matchId", async (request, respond) => {
  try {
    const matchId = request.params.matchId
    const match = await pool.query(
      "SELECT player_list FROM lobbies WHERE id = $1",
      [matchId]
    )
    respond.json(match.rows[0].player_list)
  } catch (error) {
    console.log(error)
    return respond.status(500).json("Internal Server Error")
  }
})

// give user winner of specific match
router.get("/matchWinner/:matchId", async (request, respond) => {
  try {
    const matchId = request.params.matchId
    const match = await pool.query("SELECT winner FROM lobbies WHERE id = $1", [
      matchId,
    ])
    respond.json(match.rows[0].winner)
  } catch (error) {
    console.log(error)
    return respond.status(500).json("Internal Server Error")
  }
})

// give user timestamp of specific match
router.get("/matchTimestamp/:matchId", async (request, respond) => {
  try {
    const matchId = request.params.matchId
    const match = await pool.query(
      "SELECT timestamp FROM lobbies WHERE id = $1",
      [matchId]
    )
    respond.json(match.rows[0].timestamp)
  } catch (error) {
    console.log(error)
    return respond.status(500).json("Internal Server Error")
  }
})

// give user name of specific match
router.get("/matchName/:matchId", async (request, respond) => {
  try {
    const matchId = request.params.matchId
    const match = await pool.query("SELECT name FROM lobbies WHERE id = $1", [
      matchId,
    ])
    respond.json(match.rows[0].name)
  } catch (error) {
    console.log(error)
    return respond.status(500).json("Internal Server Error")
  }
})

// give user all lobbies of specific user
router.get("/matchPlayer/:userId", async (request, respond) => {
  try {
    const matchId = request.params.userId
    const match = await pool.query(
      "SELECT * FROM lobbies WHERE ARRAY[$1] && player_list",
      [matchId]
    )
    respond.json(match.rows)
  } catch (error) {
    console.log(error)
    return respond.status(500).json("Internal Server Error")
  }
})

export default router
