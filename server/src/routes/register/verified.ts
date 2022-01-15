import auth from "../../middleware/register/auth"
import { Router } from "express"

const router = Router()

router.get("/verified", auth, async (request, respond) => {
  try {
    respond.json(true)
  } catch (error) {
    console.log(error)
    return respond.status(500).json("Internal Server Error")
  }
})

export default router
