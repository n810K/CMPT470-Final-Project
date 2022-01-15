import { NextFunction } from "express"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config()

export default (request, response, next: NextFunction) => {
  const token = request.header("token")
  if (!token) {
    return response.status(403).json("Not Authorize")
  }

  try {
    const payload = jwt.verify(token, process.env["jwt_secret"])
    request["user"] = payload["user"]
    next()
  } catch (error) {
    response.status(403).json("Not Authorize")
  }
}
