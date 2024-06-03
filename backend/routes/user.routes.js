import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/", UserController.createUser);
userRoute.get("/", UserController.readUsers);
userRoute.patch("/:id", UserController.updateUser);
userRoute.delete("/:id", UserController.deleteUser);

export default userRoute;
