import ServerError from "../ServerError.js";
import { TOKEN_ERROR } from "../constants/errorCodes.js";

// Middleware to check if the user is not a student
// Instead of checking if the user is a teacher or admin, we are checking if the user is not a student
export const isNotStudent = (req, res, next) => {
  if (req.userRole === "student") {
    return next(new ServerError(TOKEN_ERROR.FORBIDDEN_ACCESS));
  }
  next();
};
