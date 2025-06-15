const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const List = require("./List");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("pendente", "em_andamento", "concluida"),
    defaultValue: "pendente",
  },
  prazo: {
    type: DataTypes.DATE,
  },
  prioridade: {
    type: DataTypes.ENUM("baixa", "media", "alta"),
    defaultValue: "media",
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  listId: {
    type: DataTypes.INTEGER,
    references: {
      model: List,
      key: "id",
    },
  },
});

module.exports = Task;
