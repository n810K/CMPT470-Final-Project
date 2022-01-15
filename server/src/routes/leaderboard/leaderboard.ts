import pool from "../../db/db"
import { Router } from "express"

const router = Router()

// gets all user name and elo
router.get("/ranking", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT name, elo
      FROM users
      ORDER BY elo DESC
      LIMIT 5
      `
    )

    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json("cannot get users")
  }
})

export default router
