const Task = require("../models/Task");
const List = require("../models/List");
const Board = require("../models/Board");

const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      userId: req.user.id,
    };

    if (req.body.listId) {
      // Usando apenas findByPk para evitar problemas com eager loading
      const list = await List.findByPk(req.body.listId);

      if (!list) {
        return res.status(404).json({ message: "Lista não encontrada" });
      }

      // Verificar se a lista pertence a um quadro do usuário
      const board = await Board.findByPk(list.boardId);
      if (!board || board.userId !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Acesso negado à lista solicitada" });
      }
    }

    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao criar a tarefa", error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Tarefa não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefa", error });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (task) {
      await task.update(req.body);
      res.status(200).json(task);
    } else {
      res
        .status(404)
        .json({ message: "Tarefa não encontrada ou não pertence ao usuário" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar tarefa", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (task) {
      await task.destroy();
      res.status(200).json({ message: "Tarefa deletada" });
    } else {
      res
        .status(404)
        .json({ message: "Tarefa não encontrada ou não pertence ao usuário" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar a tarefa", error });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
