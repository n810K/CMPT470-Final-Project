import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const jwtGen = (user_id) => {
  //create a payload
  const payload = {
    user: user_id,
  }
  return jwt.sign(payload, process.env.jwt_secret, { expiresIn: "3hr" })
}

export default jwtGen
