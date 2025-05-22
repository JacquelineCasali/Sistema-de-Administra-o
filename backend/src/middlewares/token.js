const jwt = require("jsonwebtoken");

const ValidateToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    // //se nao existir
    return res
      .status(401)
      .json({ message: "Token não foi fornecido ou está invalido" });
  }
  const [bearer, token] = authToken.split(" "); // "Bearer"   "000000000"

  //validar com jwt

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.userId = decoded.userId;
    next();
  });
};

module.exports = ValidateToken;
