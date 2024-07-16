import { Router } from "express";
import SubjectController from "../controllers/subject.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const subjectRoute = Router();

subjectRoute.post("/", tryCatch(SubjectController.createSubject));

/* 
    works with query params

    1. /search finds all subjects
    2. e.g. /search?id=123
    3. e.g. /search?teacher_id=123
    4. e.g. /search?name=math
    5. e.g. /search?teacher_id=123&name=math
*/
subjectRoute.get("/search", tryCatch(SubjectController.readSubjects));

subjectRoute.patch("/:id", tryCatch(SubjectController.updateSubject));

subjectRoute.delete("/:id", tryCatch(SubjectController.deleteSubject));

export default subjectRoute;
