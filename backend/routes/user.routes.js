import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const userRoute = Router();

userRoute.post("/", tryCatch(UserController.createUser));

userRoute.get("/search/:id?", tryCatch(UserController.readUserById)); // query params
userRoute.get("/admins", tryCatch(UserController.readAdmins));
userRoute.get("/students", tryCatch(UserController.readStudents));
userRoute.get("/teachers", tryCatch(UserController.readTeachers));
userRoute.get("/", tryCatch(UserController.readUsers));

userRoute.patch("/:id", tryCatch(UserController.updateUser));

userRoute.delete("/:id", tryCatch(UserController.deleteUser));

export default userRoute;
