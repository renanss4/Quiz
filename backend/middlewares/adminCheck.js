import ServerError from "../ServerError.js";
import { TOKEN_ERROR } from "../constants/errorCodes.js";

// Middleware to check if the user is an admin
export const adminCheck = (req, res, next) => {
    if (req.userRole !== "admin") {
        return next(new ServerError(TOKEN_ERROR.FORBIDDEN_ACCESS));
    }
    next();
};
  