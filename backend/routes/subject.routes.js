import { Router } from "express";
import { SubjectController } from "../controllers/subject.controller.js";

const subjectRoute = Router();

subjectRoute.post("/", SubjectController.createSubject);
subjectRoute.get("/", SubjectController.readSubjects);
subjectRoute.get("/:id", SubjectController.readSubjectById);
subjectRoute.patch("/:id", SubjectController.updateSubject);
subjectRoute.delete("/:id", SubjectController.deletedSubject);

export default subjectRoute;
