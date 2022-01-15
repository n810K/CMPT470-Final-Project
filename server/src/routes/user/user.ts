import pool from "../../db/db"
import { Router } from "express"

const router = Router()

router.get("/getElo/:username", async (request, response) => {
  try {
    const username = request.params.username
    const query = await pool.query("SELECT elo FROM users WHERE name = $1", [
      username,
    ])
    if (query.rows.length === 0) {
      return response.status(404).json("User not Found")
    }
    response.json(query.rows[0])
  } catch (error) {
    return response.status(500).json("Internal Server Error")
  }
})

export default router
