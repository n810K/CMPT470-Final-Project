import { Pool } from "pg"
import { questions, users, lobbies } from "./seedData"

const pool = new Pool({
  user: "admin",
  password: "admin",
  host: "project-pg",
  port: 5432,
  database: "postgres",
})

pool.connect()
const query = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
  id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
  name     text NOT NULL,
  email    text NOT NULL,
  password text NOT NULL,
  elo      integer DEFAULT 1000
);

CREATE TABLE IF NOT EXISTS questions(
  id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type     integer DEFAULT 0,
  question text NOT NULL,
  answers  text[] NOT NULL,
  correct  integer
);
 
CREATE TABLE IF NOT EXISTS lobbies(
  id text PRIMARY KEY,
  player_list text[] NOT NULL,
  winner text[] NOT NULL,
  timestamp bigint NOT NULL,
  name text
);
`
const seedData = `
CREATE TABLE IF NOT EXISTS seedChecks(
  hasSeededAPI bool NOT NULL
);

INSERT INTO seedChecks(hasSeededAPI)
SELECT false
WHERE NOT EXISTS (SELECT * FROM seedChecks);

SELECT hasSeededAPI FROM seedChecks;
`

const handleError = (error: Error) => {
  if (error) {
    console.error(error)
  }
}

pool.query(query, (err, res) => {
  if (err) {
    console.log(err)
    return
  } else {
    console.log("db connected")
    pool.query(seedData, (err, res) => {
      if (err) {
        console.log(err)
        return
      } else {
        let seed = res[2].rows[0].hasseededapi
        if (seed === false) {
          questions.forEach(({ type, question, answers, correct }) =>
            pool.query(
              `
              INSERT INTO questions(type, question, answers, correct)
              VALUES ($1, $2, $3, $4)
              `,
              [type, question, answers, correct],
              handleError
            )
          )
          users.forEach(({ name, email, password, elo }) =>
            pool.query(
              `
              INSERT INTO users(name, email, password, elo)
              VALUES ($1, $2, $3, $4)
              `,
              [name, email, password, elo],
              handleError
            )
          )
          lobbies.forEach(({ id, players, winner, timestamp, name }) =>
            pool.query(
              `
              INSERT INTO lobbies(id, player_list, winner, timestamp, name)
              VALUES ($1, $2, $3, $4, $5)
              `,
              [id, players, winner, timestamp, name],
              handleError
            )
          )
          pool.query(
            `
            UPDATE seedChecks
            SET hasSeededAPI = true;
            `,
            handleError
          )
        }
      }
    })
  }
})

export default pool
