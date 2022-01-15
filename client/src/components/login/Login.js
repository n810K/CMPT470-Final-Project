import React, { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "../login/Login.css"

const Login = ({ status }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })
  const { email, password } = inputs
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    const params = { email, password }
    try {
      const invokeUrl = "http://localhost:5000/auth/login"
      const response = await fetch(invokeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
      const parse = await response.json()
      if (parse.token) {
        localStorage.setItem("token", parse.token)
        //set state to true to redirect user to dashboard
        status(true)
        toast.success("Successful login")
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
      <div id="login_page">
        <div id="login_container">
          <h1 id="login_title">Login</h1>
          <form onSubmit={onSubmit}>
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
              value={password}
              onChange={(event) => onChange(event)}
            />
            <button>
              <Link to="/dashboard">Login</Link>
            </button>
          </form>
          <Link style={{ fontFamily: "Arial" }} to="/register" id="register">
            Create Account
          </Link>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
