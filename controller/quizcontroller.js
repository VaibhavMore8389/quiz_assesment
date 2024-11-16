const QuizModel = require('../model/quizmodel');  // Import the QuizModel class

class QuizController {
    constructor() {
        if (QuizController.instance) {
            return QuizController.instance;
        }
        QuizController.instance = this;
    }

    // Create a new quiz
    createNewQuiz(req, res) {
        const { title, questions } = req.body;
        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Title and questions are required.' });
        }

        try {
            const quiz = QuizModel.createQuiz(title, questions);
            return res.status(201).json({ message: 'Quiz created successfully', quiz_id: quiz.id });
        } catch (err) {
            return res.status(500).json({ message: 'Error creating quiz', error: err.message });
        }
    }

    // Get quiz by ID
    getQuiz(req, res) {
        const quizId = parseInt(req.params.quizId, 10);
        if (isNaN(quizId)) {
            return res.status(400).json({ message: 'Invalid quiz ID' });
        }

        const quiz = QuizModel.getQuizById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        return res.status(200).json(quiz);
    }

    // Submit an answer for a specific question
    submitAnswerForQues(req, res) {
        const { quizId, questionId, selectedOption } = req.body;
        if (isNaN(quizId) || isNaN(questionId) || isNaN(selectedOption)) {
            return res.status(400).json({ message: 'Invalid data provided' });
        }

        try {
            const feedback = QuizModel.submitAnswer(quizId, questionId, selectedOption);
            return res.status(200).json(feedback);
        } catch (err) {
            return res.status(500).json({ message: 'Error submitting answer', error: err.message });
        }
    }

    // Submit the quiz with answers and get results
    submitQuiz(req, res) {
        const { quizId, userId, answers } = req.body;
        if (isNaN(quizId) || isNaN(userId) || !Array.isArray(answers)) {
            return res.status(400).json({ message: 'Invalid data provided' });
        }

        try {
            const result = QuizModel.addResult(quizId, userId, answers);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ message: 'Error submitting quiz', error: err.message });
        }
    }

    // Get the user's results for a specific quiz
    getResultsForUser(req, res) {
        const { quizId, userId } = req.params;
        if (isNaN(quizId) || isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid quiz ID or user ID' });
        }

        const result = QuizModel.getResults(Number(quizId), Number(userId));
        if (!result) {
            return res.status(404).json({ message: 'Results not found' });
        }

        return res.status(200).json(result);
    }
}

// Ensuring the class is a singleton
const quizcontroller = new QuizController();
Object.freeze(quizcontroller);  // making it immutable

module.exports = quizcontroller;
