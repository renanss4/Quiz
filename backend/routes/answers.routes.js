import { Router } from "express";
import AnswerController from "../controllers/answers.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const answerRoute = Router();

answerRoute.post("/", tryCatch(AnswerController.createAnswer));

/* 
    works with query params
    does not require adminCheck, for now

    1. /search finds all answers
    2. e.g. /search?id=123
    3. e.g. /search?quiz_id=123
    4. e.g. /search?student_id=123
    5. e.g. /search?quiz_id=123&student_id=123
*/
answerRoute.get("/search", tryCatch(AnswerController.readAnswers));

answerRoute.patch("/:id", tryCatch(AnswerController.updateAnswer));

answerRoute.delete("/:id", tryCatch(AnswerController.deleteAnswer));

export default answerRoute;
