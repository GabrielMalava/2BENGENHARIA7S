const Board = require("../models/Board");
const List = require("../models/List");
const Task = require("../models/Task");

const createBoard = async (req, res) => {
  try {
    const boardData = {
      ...req.body,
      userId: req.user.id,
    };

    const board = await Board.create(boardData);

    await List.bulkCreate([
      { title: "A fazer", position: 0, boardId: board.id },
      { title: "Em andamento", position: 1, boardId: board.id },
      { title: "Concluído", position: 2, boardId: board.id },
    ]);

    res.status(201).json(board);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar quadro", error: error.message });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(boards);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar quadros", error: error.message });
  }
};

const getBoardDetails = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!board) {
      return res.status(404).json({ message: "Quadro não encontrado" });
    }

    const lists = await List.findAll({
      where: {
        boardId: board.id,
      },
    });

    const listsWithTasks = await Promise.all(
      lists.map(async (list) => {
        const listObj = list.toJSON();
        listObj.tasks = await Task.findAll({
          where: { listId: list.id },
          order: [["position", "ASC"]],
        });
        return listObj;
      })
    );

    const result = board.toJSON();
    result.lists = listsWithTasks;

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao buscar detalhes do quadro",
      error: error.message,
    });
  }
};

const updateBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!board) {
      return res.status(404).json({ message: "Quadro não encontrado" });
    }

    await board.update(req.body);

    res.status(200).json(board);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar quadro", error: error.message });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!board) {
      return res.status(404).json({ message: "Quadro não encontrado" });
    }

    await board.destroy();

    res.status(200).json({ message: "Quadro excluído com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir quadro", error: error.message });
  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoardDetails,
  updateBoard,
  deleteBoard,
};
