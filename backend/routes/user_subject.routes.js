import { Router } from "express";
import { UserSubjectController } from "../controllers/user_subject.controller.js";

const userSubjectRoute = Router();

// PRIVATE ROUTES FOR ADMINS
// POST routes
userSubjectRoute.post("/", UserSubjectController.createUserSubject);

// GET routes
userSubjectRoute.get("/", UserSubjectController.readUsersSubjects);
userSubjectRoute.get(
  "/search/:id",
  UserSubjectController.readOnlyOneUserSubject
);

// DELETE routes
userSubjectRoute.delete("/:id", UserSubjectController.deleteUserSubject);

export default userSubjectRoute;
