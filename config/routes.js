const express = require('express');
const router = express.Router();
const QuizController = require('../controller/quizcontroller');

// Quiz Routes

// Create a new quiz
router.post('/quizzes', QuizController.createNewQuiz);

// Get a quiz by its ID (without correct answers)
router.get('/quizzes/:quizId', QuizController.getQuiz);

// Submit an answer for a specific question in a quiz
router.post('/quizzes/submit-answer', QuizController.submitAnswerForQues);

// Submit answers for the entire quiz and get the result
router.post('/quizzes/submit-quiz', QuizController.submitQuiz);

// Get results of a specific quiz for a user
router.get('/results/:quizId/:userId', QuizController.getResultsForUser);

module.exports = router;
