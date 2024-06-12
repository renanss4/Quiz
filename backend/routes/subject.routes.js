import { Router } from "express";
import { SubjectController } from "../controllers/subject.controller.js";

const subjectRoute = Router();

// PRIVATE ROUTES FOR ALL USERS
subjectRoute.get("/", SubjectController.readSubjects);

// PRIVATE ROUTES FOR ADMINS
// POST routes
subjectRoute.post("/", SubjectController.createSubject);

// GET routes
subjectRoute.get("/search/:id", SubjectController.readSubjectById);

// PATCH routes
subjectRoute.patch("/:id", SubjectController.updateSubject);

// DELETE routes
subjectRoute.delete("/:id", SubjectController.deletedSubject);

export default subjectRoute;
