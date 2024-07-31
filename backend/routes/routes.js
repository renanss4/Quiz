import { Router } from "express";
import userRoute from "./user.routes.js";
import subjectRoute from "./subject.routes.js";
import userSubjectRoute from "./user_subject.routes.js";
import UserController from "../controllers/user.controller.js";
import { checkToken } from "../middlewares/authenticate.js";
import { tryCatch } from "../utils/tryCatch.js";

const routes = Router();

// Public route to login
routes.post("/login", tryCatch(UserController.loginUser));

// Private routes that require a token
routes.use("/user", checkToken, userRoute);
routes.use("/subject", checkToken, subjectRoute);
routes.use("/user_subject", checkToken, userSubjectRoute);

// 404 - Not Found
routes.use((req, res) => {
  res.status(404).send({ Msg: "404 - Not Found" });
});

export default routes;
