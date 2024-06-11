import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRoute = Router();

// PRIVATE ROUTES FOR ADMINS
// POST routes
userRoute.post("/", UserController.createUser);

// GET routes
userRoute.get("/search/:id", UserController.readUserById);
userRoute.get("/admins", UserController.readAdmins);
userRoute.get("/students", UserController.readStudents);
userRoute.get("/teachers", UserController.readTeachers);

// PATCH routes
userRoute.patch("/:id", UserController.updateUser);

// DELETE routes
userRoute.delete("/:id", UserController.deleteUser);

// PRIVATE ROUTES FOR STUDENTS

// PRIVATE ROUTES FOR TEACHERS

export default userRoute;
