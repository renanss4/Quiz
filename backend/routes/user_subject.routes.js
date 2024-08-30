import { Router } from "express";
import UserSubjectController from "../controllers/user_subject.controller.js";
import { tryCatch } from "../utils/tryCatch.js";
import { adminCheck } from "../middlewares/adminCheck.js";

const userSubjectRoute = Router();

userSubjectRoute.post(
  "/",
  adminCheck,
  tryCatch(UserSubjectController.createUserSubject)
);

/*
  works with query params
  does not require adminCheck, for now

  1. /search finds all relationship between user and subjects
  2. e.g. /search?id=123
  3. e.g. /search?enrollment=123
  4. e.g. /search?subject_id=123
  5. e.g. /search?enrollment=123&subject_id=123
*/
userSubjectRoute.get(
  "/search",
  tryCatch(UserSubjectController.readUsersSubjects)
);

userSubjectRoute.delete(
  "/:id",
  adminCheck,
  tryCatch(UserSubjectController.deleteUserSubject)
);

export default userSubjectRoute;
