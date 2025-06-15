const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "segredo_do_jwt_deve_ser_uma_string_complexa";

const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await User.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Email já está em uso" });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const usuario = await User.create({
      nome,
      email,
      senha: senhaHash,
    });

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao registrar usuário", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: { exclude: ["senha"] },
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuários", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id, {
      attributes: { exclude: ["senha"] },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuário", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
};
