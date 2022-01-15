import bcrypt from "bcrypt"
import pool from "../../db/db"
import jwtgen from "../../utils/jwtGenerator"
import { Router } from "express"
import validRegister from "../../middleware/register/validRegister"

const router = Router()

//TODO...split file into two js files login and register

//create middleware to validate token..
// const validLogin = require("../../middleware/register/validLogin")
// const auth = require("../../middleware/register/auth")

//registration

export async function hashPassword(password) {
  const saltRound = 10
  const salt = await bcrypt.genSalt(saltRound)

  //encrypt pw
  return await bcrypt.hash(password, salt)
}

router.post("/register", validRegister, async (request, respond) => {
  try {
    // Desctruct res.body (name, email, pw)
    const { name, email, password } = request.body

    // check if user exist...if user exists in db, then throw an error
    const user = await pool.query("SELECT * FROM users WHERE name = $1", [name])
    if (user.rows.length !== 0) {
      return respond.status(401).json("User already exists")
    }

    // if user is unique we will decrypt the user pw
    // saltRound is how many rounds it will encrypt the password
    // refer to this doc https://www.npmjs.com/package/bcryptjs
    const bcryptPassword = await hashPassword(password)
    //enter the new user inside db
    //INSERT INTO users (name, email, password) VALUES ('kevin', 'kevin@email.com', '123');
    const newUser = await pool.query(
      "INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    )

    // generate jwt token
    const token = jwtgen(newUser.rows[0].id)
    respond.json({ token })
  } catch (error) {
    console.log(error.message)
    respond.status(500).json("Incorrect credentials")
  }
})

export default router
