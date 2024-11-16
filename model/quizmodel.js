class QuizModel {
    constructor() {
        if (!QuizModel.instance) {
            this.quizzes = [];
            this.results = [];
            QuizModel.instance = this;
        }
        return QuizModel.instance;
    }

    // Create a new quiz
    createQuiz(title, questions) {
        const quiz = {
            id: this.quizzes.length + 1,
            title,
            questions,
        };
        this.quizzes.push(quiz);
        return quiz;
    }

    // Get quiz by its ID
    getQuizById(quizId) {
		// console.log("this.quizzes : ",this.quizzes);
        return this.quizzes.find(quiz => quiz.id === quizId);
    }

    // Add quiz result
    addResult(quizId, userId, answers) {
        const quiz = this.getQuizById(quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }

        const score = answers.reduce((score, answer) => {
            const question = quiz.questions.find(q => q.id === answer.question_id);
            if (question && question.correct_option === answer.selected_option) {
                score += 1;
            }
            return score;
        }, 0);

        const result = {
            quiz_id: quizId,
            user_id: userId,
            score,
            answers,
        };

        this.results.push(result);
        return result;
    }

    // Get results for a specific quiz and user
    getResults(quizId, userId) {
        return this.results.find(result => result.quiz_id === quizId && result.user_id === userId);
    }

	
	submitAnswer(quizId, questionId, selectedOption) {
		const quiz = this.getQuizById(quizId);  // Retrieve the quiz by ID
		if (!quiz) {
			throw new Error('Quiz not found');
		}
	
		const question = quiz.questions.find(q => q.id === questionId);
		if (!question) {
			throw new Error('Question not found');
		}
	
		// Check if the selected answer is correct
		const isCorrect = question.correct_option === selectedOption;
	
		// Return feedback about whether the answer was correct or incorrect
		return {
			message: isCorrect ? 'Correct answer' : 'Incorrect answer',
			correct_answer: question.correct_option
		};
	}
}

const instance = new QuizModel();
Object.freeze(instance);

module.exports = instance;
