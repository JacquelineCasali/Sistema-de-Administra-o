const IsAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ error: "Acesso negado. Somente administradores." });
  }
  next();
};

module.exports = IsAdmin;