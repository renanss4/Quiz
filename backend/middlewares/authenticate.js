import ServerError from "../ServerError.js";
import { TOKEN_ERROR } from "../constants/errorCodes.js";
import jwt from "jsonwebtoken";

// Middleware to check the token sent by the user
export function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new ServerError(TOKEN_ERROR.NOT_PROVIDED);
  }

  const secret = process.env.JWT_SECRET;
  jwt.verify(token, secret, (error, payload) => {
    if (error) {
      throw new ServerError(TOKEN_ERROR.FORBIDDEN_ACCESS);
    }
    req.userId = payload.id;
    req.userRole = payload.role;
    //   console.log("Payload: ", payload);
    next();
  });
}
