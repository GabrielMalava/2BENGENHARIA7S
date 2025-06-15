const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "segredo_do_jwt_deve_ser_uma_string_complexa";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Autenticação necessária" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido", error: error.message });
  }
};

module.exports = auth;
