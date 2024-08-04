const express = require('express');

const { CreateBoard } = require("../controllers/boardController/CreateBoards");
const { UpdateBoard } = require("../controllers/boardController/UpdateBoard");
const { DeleteBoard } = require("../controllers/boardController/DeleteBoard");
const { GetBoards } = require("../controllers/boardController/GetBoards");
const { CreateList } = require('../controllers/listController/CreateList');
const { GetLists } = require('../controllers/listController/GetLists');
const { DeleteList } = require("../controllers/listController/DeleteList");
const { UpdateList } = require("../controllers/listController/UpdateList");
const { AddTasks } = require('../controllers/taskController/AddTasks');
const { DeleteUserData } = require('../controllers/DeleteUserData');


const router = express.Router();

router.post('/createboard', CreateBoard);
router.post('/updateboard', UpdateBoard);
router.post('/deleteboard', DeleteBoard, DeleteList);
router.post('/getboards', GetBoards);
router.post('/getlists', GetLists);
router.post('/createlist', CreateList)
router.post('/updatelist', UpdateList)
router.post('/addtask', AddTasks)
router.post('/deleteuserdata', DeleteUserData);

module.exports = router;