import { Router } from "express"
import auth from "../../middleware/register/auth"
import pool from "../../db/db"

const router = Router()

router.get("/", auth, async (request, response) => {
  try {
    const user = await pool.query(
      "SELECT name, email, elo FROM users WHERE id = $1",
      [request["user"]]
    )
    response.json(user.rows[0])
  } catch (error) {
    console.log(error)
    response.status(500).json("Internal Server Error")
  }
})

export default router
