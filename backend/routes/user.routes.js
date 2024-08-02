import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { tryCatch } from "../utils/tryCatch.js";
import { adminCheck } from "../middlewares/adminCheck.js";

const userRoute = Router();

userRoute.post("/", adminCheck, tryCatch(UserController.createUser));

/* 
    works with query params
    does not require adminCheck, for now

    1. /search finds all users
    2. e.g. /search?id=123
    3. e.g. /search?role=admin
    4. e.g. /search?enrollment=123456
    5. e.g. /search?role=admin&id=123&enrollment=123456
*/
userRoute.get("/search", adminCheck, tryCatch(UserController.readUsers));

userRoute.get("/me", tryCatch(UserController.readMe));

userRoute.patch("/:id", adminCheck, tryCatch(UserController.updateUser));

userRoute.delete("/:id", adminCheck, tryCatch(UserController.deleteUser));

userRoute.put(
  "/new-password",
  adminCheck,
  tryCatch(UserController.updatePassword)
);

export default userRoute;
