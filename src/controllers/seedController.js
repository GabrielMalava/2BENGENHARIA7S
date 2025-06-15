const Board = require("../models/Board");
const List = require("../models/List");
const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createSeedData = async (req, res) => {
  try {
    const senha = await bcrypt.hash("senha123", 10);
    const usuario = await User.create({
      nome: "Usuário de Teste",
      email: "teste@email.com",
      senha: senha,
    });

    const quadro = await Board.create({
      title: "Meu Primeiro Quadro",
      description: "Um quadro para testar a aplicação",
      userId: usuario.id,
    });

    const listaAFazer = await List.create({
      title: "A Fazer",
      position: 0,
      boardId: quadro.id,
    });

    const listaEmAndamento = await List.create({
      title: "Em Andamento",
      position: 1,
      boardId: quadro.id,
    });

    const listaConcluido = await List.create({
      title: "Concluído",
      position: 2,
      boardId: quadro.id,
    });

    await Task.create({
      title: "Criar API REST",
      description: "Implementar uma API REST usando Express e Sequelize",
      status: "concluida",
      prioridade: "alta",
      userId: usuario.id,
      listId: listaConcluido.id,
    });

    await Task.create({
      title: "Implementar autenticação",
      description: "Adicionar autenticação com JWT",
      status: "em_andamento",
      prioridade: "media",
      userId: usuario.id,
      listId: listaEmAndamento.id,
    });

    await Task.create({
      title: "Criar frontend",
      description: "Desenvolver interface do usuário com React",
      status: "pendente",
      prioridade: "baixa",
      userId: usuario.id,
      listId: listaAFazer.id,
    });

    res.status(200).json({
      message: "Dados iniciais criados com sucesso",
      credentials: {
        email: "teste@email.com",
        password: "senha123",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar dados iniciais",
      error: error.message,
    });
  }
};

module.exports = {
  createSeedData,
};
