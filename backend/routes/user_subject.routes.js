import { Router } from "express";
import { UserSubjectController } from "../controllers/user_subject.controller.js";

const userSubjectRoute = Router();

userSubjectRoute.post("/", UserSubjectController.createUserSubject);
userSubjectRoute.get("/", UserSubjectController.readUsersSubjects);
userSubjectRoute.get("/:id", UserSubjectController.readOnlyOneUserSubject);
userSubjectRoute.delete("/:id", UserSubjectController.deleteUserSubject);

export default userSubjectRoute;
