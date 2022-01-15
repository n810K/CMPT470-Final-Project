import React, { Fragment, useState, useEffect } from "react"

const Trivia = () => {
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [{ question, answers, id }, setQuestion] = useState({
    question: "",
    answers: [],
    id: "",
  })

  const getRandomQuestion = async () => {
    try {
      const url = "http://localhost:5000/trivia/question/random"
      const response = await fetch(url)
      const parsed = await response.json()

      setQuestion(parsed)
    } catch (error) {
      console.error(error)
    }
  }

  const checkAnswer = async (selectedIndex) => {
    try {
      const url = `http://localhost:5000/trivia/answer/${id}`
      const response = await fetch(url)
      const { correct } = await response.json()

      if (selectedIndex === correct) {
        setIsCorrect(true)
      } else {
        setIsCorrect(false)
      }

      setHasAnswered(true)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => getRandomQuestion(), [])

  return (
    <Fragment>
      <h1>QUESTIONS/TRIVIA PAGE</h1>
      <p>{question}</p>
      {answers.map((answer, i) => (
        <button key={i} onClick={() => checkAnswer(i)}>
          {answer}
        </button>
      ))}
      {hasAnswered ? (
        isCorrect ? (
          <p style={{ color: "green" }}>Correct!</p>
        ) : (
          <p style={{ color: "red" }}>Incorrect :(</p>
        )
      ) : null}
    </Fragment>
  )
}

export default Trivia
