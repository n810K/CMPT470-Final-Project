export interface Player {
  name: string
  numCorrect: number
  hasAnswered: boolean
  isReady: boolean
}

export enum RoomState {
  none = 0,
  readyUp = 1,
  trivia = 2,
  end = 3,
}

export interface Room {
  roomName: string
  players: Player[]
  id: string
  capacity: number
  rounds: number
  roundsPlayed: number
  time: number
  isTimerStarted: boolean
  state: RoomState
}

export enum QuestionType {
  MultipleChoice = 0,
  Word = 1,
}

export interface Question {
  type: QuestionType
  question: string
  answers: string[]
  correct?: number
}

export interface User {
  name: string
  email: string
  password: string
  id?: string
  elo?: number
}

export interface Lobby {
  id: string
  players: string[]
  winner: string[]
  timestamp: number
  name: string
}
