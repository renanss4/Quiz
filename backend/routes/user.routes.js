import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRoute = Router();

// PRIVATE ROUTES FOR ALL USERS
userRoute.get("/students", UserController.readStudents);
userRoute.get("/teachers", UserController.readTeachers);

// PRIVATE ROUTES FOR ADMINS
// POST routes
userRoute.post("/", UserController.createUser);
userRoute.post("/token", UserController.tokenUser);

// GET routes
userRoute.get("/search/:id?", UserController.readUserById); // query params
userRoute.get("/admins", UserController.readAdmins);
userRoute.get("/", UserController.readUsers);
userRoute.get("/role", UserController.roleUser);

// PATCH routes
userRoute.patch("/:id", UserController.updateUser);

// DELETE routes
userRoute.delete("/:id", UserController.deleteUser);

// PRIVATE ROUTES FOR STUDENTS

// PRIVATE ROUTES FOR TEACHERS

export default userRoute;
