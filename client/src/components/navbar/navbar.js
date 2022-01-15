import React from "react"
import { Link } from "react-router-dom"
import "../navbar/navbar.css"

// Adapted from: https://www.youtube.com/watch?v=fL8cFqhTHwA
class Navbar extends React.Component {
  state = { clicked: false }

  show_menu = () => {
    //set state to opposite values so the hamburger menu changes to exit
    this.setState({ clicked: !this.state.clicked })
  }
  render() {
    return (
      <nav className="navbar_section">
        <h1 className="logo">QuestQuiz.</h1>
        <section className="hamburger_menu" onClick={this.show_menu}>
          <i
            className={
              this.state.clicked ? "fas fa-times fa-2x" : "fas fa-bars fa-2x"
            }
          ></i>
        </section>

        <main>
          <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link className="links" to="/dashboard">
                Home
              </Link>
            </li>
            <li>
              <Link className="links" to="/rooms">
                Game
              </Link>
            </li>
            <li>
              <Link className="links" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="links" to="/create">
                Create
              </Link>
            </li>
            <li>
              <Link className="links" to="#" style={{ color: "red" }}>
                <a
                  onClick={(event) => {
                    event.preventDefault()
                    localStorage.removeItem("token")
                    this.props.status(false)
                  }}
                >
                  Sign Out
                </a>
              </Link>
            </li>
          </ul>
        </main>
      </nav>
    )
  }
}

export default Navbar
