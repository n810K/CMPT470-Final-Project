import React from "react"
import { Link } from "react-router-dom"
import "../home/Home.css"
import logo from "../../images/science.png"
import books from "../../images/books.jpg"
import idea from "../../images/idea.png"
import quiz from "../../images/quiz.png"
import answer from "../../images/answer.png"

const Home = () => {
  return (
    <div id="home_page">
      <nav id="nav_bar">
        <div id="logo_title">
          <h1 className="logo">QuestQuiz</h1>
        </div>

        <div id="links">
          <div>
            <Link
              style={{ fontFamily: "Arial" }}
              to="/login"
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
          </div>
          <div>
            <Link
              style={{ fontFamily: "Arial" }}
              to="/register"
              style={{ textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div id="books_container">
        <img id="books" src={books} alt="books" />
      </div>

      <div id="idea_container">
        <hr />
        <img className="icon_images" src={idea} alt="idea"></img>
        <h2 className="section_subtitle">Idea</h2>
        <p className="section_description">
          Our group's idea is to create an educational trivia game. There will
          be private rooms that users can create and join to play with their
          friends, and a set of trivia questions that they must answer within a
          time period. Each question will be given a certain amount of time.
          Total score tallies will be displayed at the end and the player's
          placings.
        </p>
      </div>

      <div id="purpose_container">
        <hr />
        <img className="icon_images" src={quiz} alt="quiz"></img>
        <h2 className="section_subtitle">Purpose</h2>
        <p className="section_description">
          Our main purpose in designing this application was to educate kids
          through various fun games. This will appeal to those that prefer
          learning in a more relaxing and fun environment, while also containing
          a competitive aspect for those who wish to prove themselves. By
          creating an educational yet fun environment, this application will be
          appealing to all ages, while also serving as a new means of learning.
          As individuals in this generation are more engaged in learning through
          interactive games rather than traditional books, this application will
          aim to target those who excel and prefer a different learning style.
          As such, this application will take on the role of a new educational
          tool, that is both lightweight and convenient, while also being easily
          accessible to everyone.
        </p>
      </div>

      <div id="problem_container">
        <hr />
        <img className="icon_images" src={answer} alt="answer"></img>
        <h2 className="section_subtitle">Problem</h2>
        <p className="section_description">
          The problem that this application aims to solve is to improve general
          knowledge in all individuals in various categories. This will serve as
          an easily accessible resource that can not only entertain, but also
          increase an individual's knowledge in various aspects of life, through
          trivia questions. The competitive aspect of the game will entice the
          more competitive individuals, indirectly pushing for further and more
          well-rounded learning.
        </p>
      </div>

      <footer id="home_footer">
        <hr />
        <div>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <div>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/vectors-market"
            title="Vectors Market"
          >
            Vectors Market
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <div>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <div>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/good-ware"
            title="Good Ware"
          >
            Good Ware
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home
