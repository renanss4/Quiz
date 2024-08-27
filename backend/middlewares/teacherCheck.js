import ServerError from "../ServerError.js";
import { TOKEN_ERROR } from "../constants/errorCodes.js";

// Middleware to check if the user is a teacher
export const teacherCheck = (req, res, next) => {
  if (req.userRole !== "teacher") {
    return next(new ServerError(TOKEN_ERROR.FORBIDDEN_ACCESS));
  }
  next();
};
