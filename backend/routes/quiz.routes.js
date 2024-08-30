import { Router } from "express";
import QuizController from "../controllers/quiz.controller.js";
import { tryCatch } from "../utils/tryCatch.js";
import { teacherCheck } from "../middlewares/teacherCheck.js";
import { isNotStudent } from "../middlewares/isNotStudent.js";
import { adminCheck } from "../middlewares/adminCheck.js";

const quizRoute = Router();

quizRoute.post("/", teacherCheck, tryCatch(QuizController.createQuiz));

/*
    works with query params
    does not require adminCheck, for now

    1. /search finds all quizzes
    2. e.g. /search?id=123
    3. e.g. /search?subject_id=123
    4. e.g. /search?name=math
    5. e.g. /search?subject_id=123&name=math
*/
quizRoute.get("/search", tryCatch(QuizController.readQuizzes));

quizRoute.put(
  "/question/:id",
  teacherCheck,
  tryCatch(QuizController.addQuestion)
);

quizRoute.put(
  "/draft/:id",
  teacherCheck,
  tryCatch(QuizController.transformDraft)
);

quizRoute.patch("/:id", adminCheck, tryCatch(QuizController.updateQuiz));

quizRoute.delete("/:id", isNotStudent, tryCatch(QuizController.deleteQuiz));

export default quizRoute;
