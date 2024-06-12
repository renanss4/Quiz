import { Router } from "express";
import userRoute from "./user.routes.js";
import subjectRoute from "./subject.routes.js";
import userSubjectRoute from "./user_subject.routes.js";
import { UserController } from "../controllers/user.controller.js";
import { checkToken } from "../middlewares/authenticate.js";

const routes = Router();

// Handle the error 404

// Public routes
routes.post("/login", UserController.loginUser);

// Private routes
routes.use("/user", checkToken, userRoute);
routes.use("/subject", checkToken, subjectRoute);
routes.use("/user_subject", checkToken, userSubjectRoute);

routes.use((req, res) => {
  res.status(404).send({ Msg: "404 - Not Found" });
});

export default routes;
