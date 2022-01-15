import bcrypt from "bcrypt"
import pool from "../../db/db"
import jwtgen from "../../utils/jwtGenerator"
import validLogin from "../../middleware/register/validLogin"
import { Router } from "express"

const router = Router()

router.post("/login", validLogin, async (request, respond) => {
  try {
    const { email, password } = request.body

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ])
    if (user.rows.length === 0) {
      return respond.status(401).json("Incorrect credentials")
    }
    const validPW = await bcrypt.compare(password, user.rows[0].password)
    if (!validPW) {
      return respond.status(401).json("Incorrect credentials")
    }
    const token = jwtgen(user.rows[0].id)
    respond.json({ token })
  } catch (error) {
    console.log(error.message)
    respond.status(500).json("Internal Server Error")
  }
})

export default router
