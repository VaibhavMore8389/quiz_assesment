
# Quiz API

Project Title :  Quiz API


Details : This is a simple Quiz API built using Node.js and Express. It allows users to create quizzes, answer questions, and retrieve results. The API is designed following RESTful principles and can be used for creating and managing quizzes with multiple-choice questions.


## Features
**Create Quiz**: Allows users to create a quiz with multiple-choice questions.
**Get Quiz**: Fetch a quiz by its ID without revealing the correct answers.
**Submit Answer**: Submit answers for individual questions and get immediate feedback.
**Get Results**: Fetch the results of a quiz, including the score and correctness of the answers.


## Technologies Used

Node.js (Backend)
Express.js (Web framework)
In-memory data storage (for quizzes, questions, and results)
ES6 Classes (for models and controllers)
RESTful API design


## Installation
1. Clone the repository
First, clone this repository to your local machine:

git clone https://github.com/VaibhavMore8389/quiz_assesment.git

cd quiz_assesment


2. Install Dependencies
Make sure you have Node.js installed on your machine. You can check by running node -v in your terminal.

Next, install the required dependencies:
npm install

This will install the following packages:

express: Web framework for building APIs
body-parser: Middleware to parse incoming request bodies


3. Start the Server
To start the API server, run:

npm start


By default, the API will run on http://localhost:3000.



# API Endpoints

1. Create a Quiz
Endpoint: POST /quizzes
Description: Create a new quiz with a title and a set of questions.
Request Body:

{
    "title": "General Knowledge",
    "questions": [
        {
            "id": 1,
            "text": "What is the capital of France?",
            "options": ["Berlin", "Madrid", "Paris", "Lisbon"],
            "correct_option": 2
        },
        {
            "id":2,
            "text": "What is 2 + 2?",
            "options": ["3", "4", "5", "6"],
            "correct_option": 1
        }
    ]
}


Response:

{
  "message": "Quiz created successfully",
  "quiz_id": 1
}


2. Get a Quiz by ID
Endpoint: GET /quizzes/:quizId
Description: Fetch the quiz by its ID without revealing the correct answers.
Response:

{
  "id": 1,
  "title": "General Knowledge",
  "questions": [
    {
      "id": 1,
      "text": "What is the capital of France?",
      "options": ["Berlin", "Madrid", "Paris", "Lisbon"]
    },
    {
      "id": 2,
      "text": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"]
    }
  ]
}


3. Submit an Answer
Endpoint: POST /quizzes/submit-answer
Description: Submit an answer for a specific question in a quiz. The response will indicate whether the answer is correct or not, and provide the correct answer if the user was wrong.
Request Body:

{
  "quizId": 1,
  "questionId": 1,
  "selectedOption": 2
}

Response:

{
  "message": "Correct answer",
  "correct_answer": 2
}


4. Submit Quiz
Endpoint: POST /quizzes/submit-quiz
Description: Submit all answers for a specific quiz and get the total score.
Request Body:

{
  "quizId": 1,
  "userId": 1,
  "answers": [
    { "question_id": 1, "selected_option": 2 },
    { "question_id": 2, "selected_option": 1 }
  ]
}


Response:

{
  "message": "Quiz submitted successfully",
  "score": 2,
  "answers": [
    { "question_id": 1, "selected_option": 2, "is_correct": true },
    { "question_id": 2, "selected_option": 1, "is_correct": true }
  ]
}


5. Get Results
Endpoint: GET /results/:quizId/:userId
Description: Fetch the results of a quiz for a user, including the score and summary of answers.
Response:

{
  "quiz_id": 1,
  "user_id": 1,
  "score": 2,
  "answers": [
    { "question_id": 1, "selected_option": 2, "is_correct": true },
    { "question_id": 2, "selected_option": 1, "is_correct": true }
  ]
}




# Data Models

Quiz
id: Unique identifier for the quiz.
title: The title of the quiz.
questions: A list of questions (see below).

Question
id: Unique identifier for the question.
text: The text of the question.
options: A list of answer options.
correct_option: The index of the correct answer in the options array.


Answer
question_id: The ID of the question being answered.
selected_option: The index of the selected answer option.
is_correct: Boolean indicating if the selected answer is correct.


Result
quiz_id: The ID of the quiz.
user_id: The ID of the user.
score: The user's score for the quiz.
answers: A list of answers provided by the user.





# Testing the API
You can test the API using tools like Postman or cURL. Below is an example of testing using Postman:

Create a Quiz: Use a POST request to /quizzes to create a new quiz.
Get Quiz by ID: Use a GET request to /quizzes/:quizId to fetch the quiz.
Submit Answer: Use a POST request to /quizzes/submit-answer to submit answers.
Submit Quiz: Use a POST request to /quizzes/submit-quiz to submit the entire quiz.
Get Results: Use a GET request to /results/:quizId/:userId to get the quiz results.


# Example of Usage

Create a new quiz:

POST http://localhost:3000/quizzes
Body:
{
    "title": "General Knowledge",
    "questions": [
        {
            "id": 1,
            "text": "What is the capital of France?",
            "options": ["Berlin", "Madrid", "Paris", "Lisbon"],
            "correct_option": 2
        },
        {
            "id":2,
            "text": "What is 2 + 2?",
            "options": ["3", "4", "5", "6"],
            "correct_option": 1
        }
    ]
}


Get a quiz by ID:

GET http://localhost:3000/quizzes/1


Submit an answer:

POST http://localhost:3000/quizzes/submit-answer
Body:
{
  "quizId": 1,
  "questionId": 1,
  "selectedOption": 2
}



License
This project is licensed under the MIT License - see the LICENSE file for details.



Notes
This project uses in-memory storage, so all data will be lost when the server is restarted.
You can easily modify the code to integrate with a database (e.g., MongoDB, MySQL) for persistent storage.
