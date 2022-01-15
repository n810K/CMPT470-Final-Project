import React, { Fragment, useState } from "react"
import "../create/createQ.css"
import Navbar from "../../components/navbar/navbar"
import { toast } from "react-toastify"

const CreateQ = ({ status }) => {
  const [inputs, setInputs] = useState({
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctIndex: "",
  })
  const { question, choiceA, choiceB, choiceC, choiceD, correctIndex } = inputs
  const onSubmit = async (event) => {
    event.preventDefault()
    var correct = parseInt(correctIndex, 10)
    correct = correct - 1
    const params = {
      question,
      answers: [choiceA, choiceB, choiceC, choiceD],
      correct,
    }
    const invokeUrl = "http://localhost:5000/trivia/question/"
    await fetch(invokeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
    setInputs({
      question: "",
      choiceA: "",
      choiceB: "",
      choiceC: "",
      choiceD: "",
      correctIndex: "",
    })
    toast.success("Successfully created new question")
  }
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  return (
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
              required="required"
              value={question}
              onChange={(event) => onChange(event)}
            />
            <label>Choice 1</label>
            <input
              type="text"
              name="choiceA"
              placeholder="choice A"
              value={choiceA}
              required="required"
              onChange={(event) => onChange(event)}
            />
            <label>Choice 2</label>
            <input
              type="text"
              name="choiceB"
              placeholder="choice B"
              value={choiceB}
              required="required"
              onChange={(event) => onChange(event)}
            />
            <label>Choice 3</label>
            <input
              type="text"
              name="choiceC"
              placeholder="choice C"
              value={choiceC}
              required="required"
              onChange={(event) => onChange(event)}
            />
            <label>Choice 4</label>
            <input
              type="text"
              name="choiceD"
              placeholder="choice D"
              value={choiceD}
              required="required"
              onChange={(event) => onChange(event)}
            />
            <label>Correct Answer (index)</label>
            <input
              type="number"
              name="correctIndex"
              placeholder="correct answer index"
              min="1"
              max="4"
              value={correctIndex}
              required="required"
              onChange={(event) => onChange(event)}
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default CreateQ
