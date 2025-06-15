const Task = require("./Task");
const User = require("./User");
const Board = require("./Board");
const List = require("./List");

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Board, { foreignKey: "userId" });
Board.belongsTo(User, { foreignKey: "userId" });

Board.hasMany(List, { foreignKey: "boardId", onDelete: "CASCADE" });
List.belongsTo(Board, { foreignKey: "boardId" });

List.hasMany(Task, { foreignKey: "listId", onDelete: "CASCADE", as: "Tasks" });
Task.belongsTo(List, { foreignKey: "listId" });

module.exports = {
  User,
  Task,
  Board,
  List,
};
