import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import Navbar from "../../components/navbar/navbar"
import "../create/create.css"

const Create = ({ status }) => {
  return (
    <Fragment>
      <div id="create_question_page">
        <nav className="create_navbar">
          <Navbar status={status} />
        </nav>
        <div id="parent">
          <div id="container">
            <div id="mc">
              <Link id="linkmc" to="/create/mc">
                Create MC
              </Link>
            </div>
            <div id="tf">
              <Link id="linktf" to="/create/tf">
                Create T/F
              </Link>
            </div>
            <div id="word">
              <Link id="linkword" to="/create/word">
                Create Word Question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Create
