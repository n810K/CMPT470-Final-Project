import { Question, QuestionType, User, Lobby } from "../types"

const questions: Question[] = [
  {
    type: QuestionType.Word,
    question: "What is the rarest colour of the M&M candy?",
    answers: ["brown"],
  },
  {
    type: QuestionType.Word,
    question: "In which European city would you find Orly airport?",
    answers: ["Paris"],
  },
  {
    type: QuestionType.Word,
    question:
      "Which two U.S. states don't observe Daylight Saving Time? (Answer any one of the two)",
    answers: ["Arizona", "Hawaii"],
  },
  {
    type: QuestionType.Word,
    question: "Which country consumes the most chocolate per capita?",
    answers: ["Switzerland"],
  },
  {
    type: QuestionType.Word,
    question: "What is the capital city of the Yukon?",
    answers: ["yellow knife", "yellowknife"],
  },
  {
    type: QuestionType.MultipleChoice,
    question: "With which doubles partner did John McEnroe have most success?",
    answers: [
      "Mark Woodforde",
      "Michael Stich",
      "Mary Carillo",
      "Peter Fleming",
    ],
    correct: 3,
  },
  {
    type: QuestionType.MultipleChoice,
    question:
      "What was the code name for the Allied invasion of Southern France on August 15th, 1944?",
    answers: [
      "Operation Overlord",
      "Operation Dragoon",
      "Operation Market Garden",
      "Operation Torch",
    ],
    correct: 1,
  },
  {
    type: QuestionType.MultipleChoice,
    question: "What is the capital city of Bermuda?",
    answers: ["Hamilton", "Santo Dominigo", "Havana", "San Juan"],
    correct: 0,
  },
  {
    type: QuestionType.MultipleChoice,
    question: "The pantheon in Rome was used to worship what god?",
    answers: ["Any god they wanted", "Athena", "Zeus", "Both Athena and Zeus"],
    correct: 0,
  },
  {
    type: QuestionType.MultipleChoice,
    question:
      "Which male player won the gold medal of table tennis singles in 2016 Olympics Games?",
    answers: [
      "Zhang Jike (China)",
      "Jun Mizutani (Japan)",
      "Ma Long (China)",
      "Vladimir Samsonov (Belarus)",
    ],
    correct: 2,
  },
  {
    type: QuestionType.MultipleChoice,
    question: "The man that shot Alexander Hamilton was named Aaron Burr.",
    answers: ["True", "False"],
    correct: 0,
  },
  {
    type: QuestionType.MultipleChoice,
    question:
      "The value of one Calorie is different than the value of one calorie.",
    answers: ["True", "False"],
    correct: 0,
  },
  {
    type: QuestionType.MultipleChoice,
    question:
      "If you could fold a piece of paper in half 50 times, its thickness will be 3/4th the distance from the Earth to the Sun.",
    answers: ["True", "False"],
    correct: 0,
  },
  {
    type: QuestionType.MultipleChoice,
    question: "What is the same in Celsius and Fahrenheit?",
    answers: ["32", "-39", "-40", "-42"],
    correct: 2,
  },
  {
    type: QuestionType.MultipleChoice,
    question:
      "Which company did the animation for Peter Gabriels Video Sledgehammer (1986)?",
    answers: [
      "HIT Entertainment",
      "Aardman Animations",
      "Illumination Entertainment",
      "VIZ Media",
    ],
    correct: 1,
  },
  {
    type: QuestionType.MultipleChoice,
    question:
      "The Quadrangularis Reversum is best described as which of the following?",
    answers: [
      "A building in Oxford University",
      "A chess move",
      "A percussion instrument",
      "A geometric theorem",
    ],
    correct: 2,
  },
  {
    type: QuestionType.Word,
    question: "In which city, is the Big Nickel located in Canada?",
    answers: ["Sudbury"],
  },
  {
    type: QuestionType.MultipleChoice,
    question: "The acronym RIP stands for which of these?",
    answers: [
      "Runtime Instance Processes",
      "Regular Interval Processes",
      "Routing Information Protocol",
      "Routine Inspection Protocol",
    ],
    correct: 2,
  },
]

const users: User[] = [
  {
    name: "user1",
    email: "user1@gmail.com",
    password: "$2b$10$Anz0BvPzkXIQgvjehJjYTewpv5h4pRsMpijC0BKEPczh7EQpWHhoS",
    elo: 1037,
  },
  {
    name: "user2",
    email: "user2@gmail.com",
    password: "$2b$10$ZWpI/0JfMQhO9zMw/bcbcOYPeTo61U1EgnzMUvQBqFNXMc80npAAe",
    elo: 989,
  },
  {
    name: "user3",
    email: "user3@gmail.com",
    password: "$2b$10$nOzavYWPEhemu6Gp0679tu63kdhTPG.Z89wnh11lstCaDe9hfXqqq",
    elo: 965,
  },
]

const lobbies: Lobby[] = [
  {
    id: "uuid-place-holder",
    players: ["user1", "user2", "user3"],
    winner: ["user1"],
    timestamp: 1639350277950,
    name: "room1",
  },
]

export { questions, users, lobbies }
