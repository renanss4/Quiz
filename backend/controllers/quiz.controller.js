import { quizzesModel } from "../models/quiz.model.js";
import { subjectsModel } from "../models/subject.model.js";
import { validateId } from "../utils/validateId.js";
import { validateDate } from "../utils/validateDate.js";

class QuizController {
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

    if (!validateDate(date_start) || !validateDate(date_end)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use MM/DD/YYYY" });
    }

    if (new Date(date_end) <= new Date(date_start)) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    const quizExists = await quizzesModel.findOne({
      name,
      subject_id,
    });
    if (quizExists) {
      return res.status(400).json({ message: "Quiz already exists" });
    }

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
      questions,
    };

    const createdQuiz = await quizzesModel.create(newQuiz);

    await subjectsModel.findByIdAndUpdate(subject_id, {
      $push: {
        quizzes: {
          quiz_id: createdQuiz._id,
          name: createdQuiz.name,
        },
      },
    });

    return res.status(201).json(createdQuiz);
  }

  async readQuizzes(req, res) {
    const { subject_id, id, name } = req.query;

    let query = {};

    if (subject_id) {
      validateId(subject_id);
      query.subject_id = subject_id;
    }

    if (id) {
      validateId(id);
      query._id = id;
    }

    if (name) {
      query.name = name;
    }

    const quizzes = await quizzesModel.find(query, "-__v").populate({
      path: "subject_id",
      select: "name",
    });

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json({ message: "No quizzes found" });
    }

    return res.status(200).send(quizzes);
  }

  async updateQuiz(req, res) {
    const id = req.params.id;

    const updatedQuiz = await quizzesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    return res.status(204).send();
  }

  async deleteQuiz(req, res) {
    const id = req.params.id;

    await subjectsModel.updateMany(
      {},
      {
        $pull: {
          quizzes: { quiz_id: id },
        },
      }
    );

    const deletedQuiz = await quizzesModel.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    return res.status(204).send();
  }
}

export default new QuizController();
