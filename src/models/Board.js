const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Board = sequelize.define("Board", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

module.exports = Board;
