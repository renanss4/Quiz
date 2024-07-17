import jwt from "jsonwebtoken";

/**
 * This function generates a token for the user.
 */
export function generateToken(user) {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id: user._id, role: user.role }, secret, {
    expiresIn: "1d",
  });
}
