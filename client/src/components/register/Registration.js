import React, { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "./Registration.css"

const Registration = ({ status }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = inputs
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault() 
    try {
      const invokeUrl = "http://localhost:5000/auth/register"
      const params = { name, email, password }
      const response = await fetch(invokeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
      //parse response from JSON
      const parse = await response.json()
      if (parse.token) {
        // gets a jwt token
        //save to storage
        localStorage.setItem("token", parse.token)
        //set state to true to redirect user to dashboard
        status(true)
        toast.success("Successfully registered a new account")
      } else {
        status(false)
        toast.error(parse)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <div id="registration_containter">
        <h1 id="login_title">Create Account</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            maxLength="30"
            placeholder="John Doe"
            value={name}
            onChange={(event) => onChange(event)}
          />
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={email}
            onChange={(event) => onChange(event)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength="8"
            value={password}
            onChange={(event) => onChange(event)}
          />
          <button value="Sign Up" type="submit">
            Sign Up
          </button>
        </form>
        <div id="existing_account">
          <p>Already have an account?</p>
          <Link  style={{fontFamily: "Arial"}} to="/login">Login</Link>
        </div>
      </div>
    </Fragment>
  )
}

export default Registration
