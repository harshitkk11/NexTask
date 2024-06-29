const express = require('express');

const { Signup, verifyMailer, verifyMail } = require('../controllers/authController/SignUpController');
const { Login } = require('../controllers/authController/LogInController');
const { verifyToken } = require('../controllers/authController/verifyToken')
const { getUser } = require('../controllers/authController/UserDataController');
const { logOut } = require('../controllers/authController/LogOutController');
const { ResetMail, ResetMailer, ResetPass } = require('../controllers/authController/ResetPassword');
const { CreateBoard } = require("../controllers/boardController/CreateBoards");
const { GetBoards } = require("../controllers/boardController/GetBoards");
const { GetBoardData } = require('../controllers/boardController/GetBoardData');

const router = express.Router();

router.post('/signup', Signup, verifyMailer);
router.post('/verify', verifyMail);
router.post('/signin', Login);
router.get('/getuser', verifyToken, getUser);
router.get('/logout', verifyToken, logOut);
router.post('/reset', ResetMail, ResetMailer);
router.post('/resetpass', ResetPass);
router.post('/createboard', CreateBoard);
router.post('/getboards', GetBoards);
router.post('/getboarddata', GetBoardData);

module.exports = router;