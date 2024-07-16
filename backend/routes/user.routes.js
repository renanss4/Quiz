import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const userRoute = Router();

userRoute.post("/", tryCatch(UserController.createUser));

userRoute.get("/search", tryCatch(UserController.readUsers));

userRoute.patch("/:id", tryCatch(UserController.updateUser));

userRoute.delete("/:id", tryCatch(UserController.deleteUser));

export default userRoute;
