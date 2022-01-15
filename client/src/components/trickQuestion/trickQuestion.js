import React, { Fragment, useState, useEffect } from "react"
import "../trickQuestion/trickQuestion.css"

const TrickQuestion = () => {
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

  useEffect(() => getRandomQuestion(), [])

  return (
    <Fragment>
      <div id="daily_question">
        <h2 id="social_media_h2">Question of the Day</h2>
        <section id="social_info">
          <p>
            <b>Question:</b> {question}
          </p>
          <ul>
            {answers.map(function (answers, i) {
              return <li key={i}>{answers}</li>
            })}
          </ul>
        </section>
      </div>
    </Fragment>
  )
}
export default TrickQuestion
