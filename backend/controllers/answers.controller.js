import { answersModel } from "../models/answers.model.js";
import { quizzesModel } from "../models/quiz.model.js";
import { usersModel } from "../models/user.model.js";
import ServerError from "../ServerError.js";
import { ANSWER_ERROR } from "../constants/errorCodes.js";
import { validateId } from "../utils/validateId.js";

class AnswerController {
  async createAnswer(req, res) {
    // Extracts answer data from the request body
    const { quiz_id, student_id, score, answers } = req.body;

    // Validates if the required fields are empty
    if (!quiz_id || !student_id || !score || !answers) {
      throw new ServerError(ANSWER_ERROR.MISSING_FIELDS);
    }

    // Checks if the quiz exists in the database by quiz_id
    const quizExists = await quizzesModel.findById(quiz_id);
    if (!quizExists) {
      throw new ServerError(ANSWER_ERROR.INVALID_QUIZ_ID);
    }

    // Checks if the student exists in the database by student_id
    const studentExists = await usersModel.findById(student_id);
    if (!studentExists) {
      throw new ServerError(ANSWER_ERROR.INVALID_STUDENT_ID);
    }

    // Checks if the answers are not empty
    if (answers.length === 0) {
      throw new ServerError(ANSWER_ERROR.EMPTY_ANSWERS);
    }

    // Creates a new answer object
    const newAnswer = {
      quiz_id,
      student_id,
      score,
      answers,
    };

    // Creates the answer in the database
    const createdAnswer = await answersModel.create(newAnswer);

    // Returns the created answer
    return res.status(201).json(createdAnswer);
  }

  async readAnswers(req, res) {
    // Extract query params for filtering
    const { quiz_id, student_id, id } = req.query;
    let query = {};

    // Add quiz_id to query if present and valid
    if (quiz_id) {
      validateId(quiz_id);
      query.quiz_id = quiz_id;
    }

    // Add student_id to query if present and valid
    if (student_id) {
      validateId(student_id);
      query.student_id = student_id;
    }

    // Add id to query if present and valid
    if (id) {
      validateId(id);
      query._id = id;
    }

    // Finds answers in the database based on the query
    const answers = await answersModel.find(query, "-__v").populate([
      { path: "student_id", select: "name" },
      { path: "quiz_id", select: "name" },
    ]);

    // if (!answers || answers.length === 0) {
    //   throw new ServerError(ANSWER_ERROR.NOT_FOUND);
    // }

    // Returns a 200 status with the found answers
    return res.status(200).send(answers);
  }

  async updateAnswer(req, res) {
    // Retrieves the id parameter from the request
    const id = req.params.id;

    // Updates the answer with the provided id using the data from the request body
    const updatedAnswer = await answersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Checks if the answer was found and updated
    if (!updatedAnswer) {
      throw new ServerError(ANSWER_ERROR.NOT_FOUND);
    }

    // Returns the updated answer
    return res.status(200).json(updatedAnswer);
  }

  async deleteAnswer(req, res) {
    // Retrieves the id parameter from the request
    const id = req.params.id;

    // Deletes the answer with the provided id
    const deletedAnswer = await answersModel.findByIdAndDelete(id);

    // Checks if the answer was found and deleted
    if (!deletedAnswer) {
      throw new ServerError(ANSWER_ERROR.NOT_FOUND);
    }

    // Returns a 204 status if the answer is deleted
    return res.status(204).send();
  }
}

export default new AnswerController();
