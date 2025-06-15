const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Board = require("./Board");

const List = sequelize.define("List", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  boardId: {
    type: DataTypes.INTEGER,
    references: {
      model: Board,
      key: "id",
    },
    allowNull: false,
  },
});

module.exports = List;
