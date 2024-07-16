import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const userRoute = Router();

userRoute.post("/", tryCatch(UserController.createUser));


/* 
    works with query params

    1. /search finds all users
    2. e.g. /search?id=123
    3. e.g. /search?role=admin
    4. e.g. /search?enrollment=123456
    5. e.g. /search?role=admin&id=123&enrollment=123456
*/
userRoute.get("/search", tryCatch(UserController.readUsers));

userRoute.patch("/:id", tryCatch(UserController.updateUser));

userRoute.delete("/:id", tryCatch(UserController.deleteUser));

userRoute.put("/new-password", tryCatch(UserController.updatePassword));

export default userRoute;
