import { quizzesModel } from "../models/quiz.model.js";
import { subjectsModel } from "../models/subject.model.js";
import { answersModel } from "../models/answers.model.js";
import { validateId } from "../utils/validateId.js";
import { validateDate } from "../utils/validateDate.js";

class QuizController {
  // Extracts quiz data from the request body
  async createQuiz(req, res) {
    const {
      subject_id,
      name,
      time,
      attempts,
      date_start,
      date_end,
      orientation,
      type,
      is_draft,
      questions,
    } = req.body;

    // Validates if the required fields are empty
    if (
      !subject_id ||
      !name ||
      !time ||
      !attempts ||
      !date_start ||
      !date_end
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Validates if the date format is correct
    if (!validateDate(date_start) || !validateDate(date_end)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD" });
    }

    // Validates if the end date is after the start date
    if (new Date(date_end) <= new Date(date_start)) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    // Checks if the quiz already exists in the database by name and subject_id
    const quizExists = await quizzesModel.findOne({
      name,
      subject_id,
    });
    if (quizExists) {
      return res.status(400).json({ message: "Quiz already exists" });
    }

    // Checks if the subject exists in the database by subject_id
    const subjectExists = await subjectsModel.findById(subject_id);
    if (!subjectExists) {
      return res.status(400).json({ message: "Invalid subject_id" });
    }

    const newQuiz = {
      subject_id,
      name,
      time,
      attempts,
      date_start,
      date_end,
      orientation,
      type,
      is_draft,
      questions: questions || [],
    };

    // Creates a new quiz in the database
    const createdQuiz = await quizzesModel.create(newQuiz);

    // Updates the subject with the new quiz
    await subjectsModel.findByIdAndUpdate(subject_id, {
      $push: {
        quizzes: {
          quiz_id: createdQuiz._id,
          name: createdQuiz.name,
        },
      },
    });

    // Returns a 201 status with the created quiz
    return res.status(201).json(createdQuiz);
  }

  async readQuizzes(req, res) {
    // Extracts query params for filtering
    const { subject_id, id, name } = req.query;

    let query = {};

    // Add subject_id to query if present and valid
    if (subject_id) {
      validateId(subject_id);
      query.subject_id = subject_id;
    }

    // Add id to query if present and valid
    if (id) {
      validateId(id);
      query._id = id;
    }

    // Add name to query if present
    if (name) {
      query.name = name;
    }

    // Finds quizzes in the database based on the query
    const quizzes = await quizzesModel.find(query, "-__v").populate({
      path: "subject_id",
      select: "name",
    });

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json({ message: "No quizzes found" });
    }

    // Returns a 200 status with the found quizzes
    return res.status(200).send(quizzes);
  }

  async addQuestion(req, res) {
    // Retrieves the id parameter from the request
    const id = req.params.id;

    // Extracts the questions array from the request body
    const { questions } = req.body;

    // Checks if the questions array is empty
    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: "Missing questions" });
    }

    // Checks if the questions array has more than 10 questions
    if (questions.length > 10) {
      return res.status(400).json({ message: "Too many questions" });
    }

    // Updates the quiz with the provided id by adding the questions
    const updatedQuiz = await quizzesModel.findByIdAndUpdate(
      id,
      {
        $push: {
          questions,
        },
      },
      {
        new: true,
      }
    );

    // Checks if the quiz was found and updated
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Returns a 204 status if the questions are added
    return res.status(204).send();
  }

  async transformDraft(req, res) {
    // Retrieves the id parameter from the request
    const id = req.params.id;

    // Updates the quiz with the provided id by setting is_draft to false
    const updatedQuiz = await quizzesModel.findByIdAndUpdate(
      id,
      { is_draft: false },
      {
        new: true,
      }
    );

    // Checks if the quiz was found and updated
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Returns a 204 status if the quiz is transformed
    return res.status(204).send();
  }

  async updateQuiz(req, res) {
    // Retrieves the id parameter from the request
    const id = req.params.id;

    // Updates the quiz with the provided id using the data from the request body
    const updatedQuiz = await quizzesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Checks if the quiz was found and updated
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Returns a 200 status with the updated quiz
    return res.status(200).send(updatedQuiz);
  }

  async deleteQuiz(req, res) {
    // Retrieves the id parameter from the request
    const id = req.params.id;

    // Updates all subjects by removing the quiz with the provided id
    await subjectsModel.updateMany(
      {},
      {
        $pull: {
          quizzes: { quiz_id: id },
        },
      }
    );

    // Updates all answers by removing the quiz with the provided id
    await answersModel.deleteMany({ quiz_id: id });

    // Deletes the quiz with the provided id
    const deletedQuiz = await quizzesModel.findByIdAndDelete(id);

    // Checks if the quiz was found and deleted
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Returns a 204 status without the deleted quiz
    return res.status(204).send();
  }
}

export default new QuizController();
