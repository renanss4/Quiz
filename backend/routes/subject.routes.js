import { Router } from "express";
import SubjectController from "../controllers/subject.controller.js";
import { tryCatch } from "../utils/tryCatch.js";
import { adminCheck } from "../middlewares/adminCheck.js";

const subjectRoute = Router();

subjectRoute.post("/", adminCheck, tryCatch(SubjectController.createSubject));

/* 
    works with query params
    does not require adminCheck, for now

    1. /search finds all subjects
    2. e.g. /search?id=123
    3. e.g. /search?teacher_id=123
    4. e.g. /search?name=math
    5. e.g. /search?teacher_id=123&name=math
*/
subjectRoute.get("/search", tryCatch(SubjectController.readSubjects));

subjectRoute.patch(
  "/:id",
  adminCheck,
  tryCatch(SubjectController.updateSubject)
);

subjectRoute.delete(
  "/:id",
  adminCheck,
  tryCatch(SubjectController.deleteSubject)
);

export default subjectRoute;
