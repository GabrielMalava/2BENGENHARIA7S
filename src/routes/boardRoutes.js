const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");
const listController = require("../controllers/listController");
const auth = require("../middleware/auth");

router.post("/boards", auth, boardController.createBoard);
router.get("/boards", auth, boardController.getBoards);
router.get("/boards/:id", auth, boardController.getBoardDetails);
router.put("/boards/:id", auth, boardController.updateBoard);
router.delete("/boards/:id", auth, boardController.deleteBoard);

router.post("/lists", auth, listController.createList);
router.put("/lists/:id", auth, listController.updateList);
router.delete("/lists/:id", auth, listController.deleteList);
router.post("/tasks/move", auth, listController.moveTask);

module.exports = router;
