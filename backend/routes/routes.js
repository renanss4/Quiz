import { Router } from "express";
import userRoute from "./user.routes.js";
import subjectRoute from "./subject.routes.js";
import userSubjectRoute from "./user_subject.routes.js";

const routes = Router();

routes.use("/users", userRoute);
routes.use("/subjects", subjectRoute);
routes.use("/users_subjects", userSubjectRoute);

export default routes;
