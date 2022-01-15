# Final Project

## Idea

Our group’s idea is to create an educational trivia game. There will be private rooms that users can create and join to play with their friends, and a set of trivia questions that they must answer within a time period. Each question will be given a certain amount of time. Total score tallies will be displayed at the end and the player’s placings.

## Reasoning

Our main purpose in designing this application was to educate kids through various fun games. This will appeal to those that prefer learning in a more relaxing and fun environment, while also containing a competitive aspect for those who wish to prove themselves. By creating an educational, yet fun environment, this application will be appealing to all ages, while also serving as a new means of learning. Also, since individuals in this generation are more engaged in learning through interactive games rather than traditional books, this application will aim to target those who excel and prefer a different learning style. As such, this application will take on the role of a new educational tool, that is both lightweight and convenient, while also being easily accessible to everyone.

## Problem to Solve

The problem that this application aims to solve is to improve general knowledge in all individuals in various categories. This will serve as an easily accessible resource that can not only entertain, but also increase an individual's knowledge in various aspects of life, through trivia questions. The competitive aspect of the game will entice the more competitive individuals, indirectly pushing for further and more well-rounded learning.

## Features

#### Account Creation

- Individuals will create their own account, then sign in to access the rest of the application.

#### Dynamic Room Creation

- Users have the ability to create a room, and when the round is finished, the room will be automatically deleted.
- Rooms are used for sockets to subscribe to for game and chat features.

#### Chat Feature

- Utilizes socket.io for a real-time chat application with chat rooms.

#### Trivia Game

- Users compete against up to three (3) other users in completing a trivia game in a series of five (5) questions
- Each correct answer rewards one (1) point. An incorrect answer has no penalty.
- Scores for the current game are tallied, and is tracked in the lobby's running leaderboard.
- At the end of the match, the total correct questions for each players are displayed, as well as their elo.

#### Elo System

- After every game, all player's rankings will be updated based off of the rankings of the other players in the lobby.
- If an individual's rank is lower than the average ranking across the lobby, and they place in the top half, they will gain more points. Similarly, if they place in the bottom half, they will lose fewer points.
- If an individual's rank is higher than the average ranking, they will gain less for winning and lose more for losing.
- A match with only one (1) person, playing against themselves, will award no ranking change.

#### Global Leaderboard

- On the dashboard, users will be able to see a top five (5) Global Leaderboard based off all users' elo.

#### Profiles

- Contains a Match History where the name of the lobby, list of all players in the room, and winner, are displayed.

#### Question Creation

- Users are able to create their own questions, that will be used in the actual trivia game.
- Users have the option of creating Multiple Choice OR T/F questions.

## Instructions

1. Checkout the repo through `git@csil-git1.cs.surrey.sfu.ca:kchensu/final-project.git` OR `https://csil-git1.cs.surrey.sfu.ca/kchensu/final-project.git` with the `final` tag
1. Inside the `final-project` folder, locate the `docker-compose` file then perform `docker-compose build && docker-compose up` in the terminal
1. In your browser, navigate to http://localhost:8080/
   1. Testing with multiple players on the same device requires the use of 2 different browers. This can be one regular tab and one incognito tab as well

#### Default User Credentials

User1:
email: user1@gmail.com
pass: user1pw!

User2:
email: user2@gmail.com
pass: user2pw!

User3:
email: user3@gmail.com
pass: user3pw!

Optional: You can also create your own user in the registration page.

## What Does Not Work

- Questions may be repeated (not unique) in the trivia game.
- No language filter (profanity) in the question form, so users can type whatever they want.
