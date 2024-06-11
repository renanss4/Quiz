import jwt from "jsonwebtoken";

export function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token não encontrado!" });
  }
  try {
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        return res.status(403).json({ msg: "Token inválido!" });
      }
      req.payload = payload;
      //   console.log("Payload: ", payload);
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro ao verificar token!" });
  }
}
