import React, { Fragment, useState } from "react"
import Navbar from "../navbar/navbar"
import { toast } from "react-toastify"

const CreateWord = ({ status }) => {
  const [inputs, setInputs] = useState({
    question: "",
    answer: "",
  })
  const { question, answer } = inputs
  const onSubmit = async (event) => {
    event.preventDefault()
    const params = {
      type: 1,
      question,
      answers: [answer],
    }
    const invokeUrl = "http://localhost:5000/trivia/question/"
    await fetch(invokeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
    setInputs({
      question: "",
      answer: "",
    })
    toast.success("Successfully created new question")
  }
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <Fragment>
        <div id="create_question_page">
          <nav className="create_navbar">
            <Navbar status={status} />
          </nav>

          <div id="create_question_content">
            <h1 id="create_title">Create Question</h1>
            <form onSubmit={onSubmit}>
              <label>Question:</label>
              <input
                type="text"
                name="question"
                placeholder="Question"
                maxLength="255"
                value={question}
                onChange={(event) => onChange(event)}
                required="required"
              />
              <label>Answer</label>
              <input
                type="text"
                name="answer"
                placeholder="answer"
                value={answer}
                maxLength="100"
                onChange={(event) => onChange(event)}
                required="required"
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </Fragment>
    </div>
  )
}

export default CreateWord
