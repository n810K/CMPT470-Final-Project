import pool from "../../db/db"
import { Router } from "express"

const router = Router()

export interface Question {
  question: string
  answers: string[]
  correct: number
}

// gets all questions
router.get("/questions", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, question, answers
      FROM questions
      `
    )

    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json("cannot get questions")
  }
})

// gets random question
router.get("/question/random", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, question, answers
      FROM questions
      ORDER BY RANDOM()
      LIMIT 1
      `
    )

    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json("cannot get question")
  }
})

// gets just question and id
router.get("/question/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT question, answers
      FROM questions
      WHERE id = $1
      `,
      [req.params.id]
    )

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.log(error.message)
    res.status(500).json("cannot get questions")
  }
})

// gets just question and id
router.get("/answer/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT correct
      FROM questions
      WHERE id = $1
      `,
      [req.params.id]
    )

    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json("cannot get questions")
  }
})

// adds a new question
router.post("/question", async (req, res) => {
  try {
    const { type, question, answers, correct } = req.body
    console.log(question)
    const result = await pool.query(
      `
      INSERT
        INTO questions(type, question, answers, correct)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `,
      [type, question, answers, correct]
    )

    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json("cannot create questions")
  }
})

export default router
