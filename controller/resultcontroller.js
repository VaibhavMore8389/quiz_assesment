const quizModel = require('../model/quizmodel');

class ResultController {
    // Get results of a specific quiz for a user
    static getResults(req, res) {
        const { quizId, userId } = req.params;

        const result = quizModel.getResults(Number(quizId), Number(userId));

        if (!result) {
            return res.status(404).json({ message: 'Results not found' });
        }

        res.status(200).json(result);
    }
}

module.exports = ResultController;
