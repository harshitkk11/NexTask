const express = require('express');

const { CreateBoard } = require("../controllers/boardController/CreateBoards");
const { UpdateBoard } = require("../controllers/boardController/UpdateBoard");
const { DeleteBoard } = require("../controllers/boardController/DeleteBoard");
const { GetBoards } = require("../controllers/boardController/GetBoards");
const { createList } = require('../controllers/listController/CreateList');
const { AddTasks } = require('../controllers/taskController/AddTasks');
const { GetLists } = require('../controllers/listController/GetLists');

const router = express.Router();

router.post('/createboard', CreateBoard);
router.post('/updateboard', UpdateBoard);
router.post('/deleteboard', DeleteBoard);
router.post('/getboards', GetBoards);
router.post('/getlists', GetLists);
router.post('/createlist', createList)
router.post('/addtask', AddTasks)


module.exports = router;