const express = require('express');

const { Signup, verifyMailer, verifyMail } = require('../controllers/SignUpController');
const { Login } = require('../controllers/LogInController');
const { verifyToken} = require('../controllers/verifyToken')
const { getUser } = require('../controllers/UserDataController');
const { logOut } = require('../controllers/LogOutController');
const { ResetMail, ResetMailer, ResetPass } = require('../controllers/ResetPassword');

const router = express.Router();

router.post('/signup', Signup, verifyMailer);
router.post('/verify', verifyMail);
router.post('/signin', Login);
router.get('/getuser', verifyToken, getUser);
router.get('/logout', verifyToken, logOut);
router.post('/reset', ResetMail, ResetMailer);
router.post('/resetpass', ResetPass);

module.exports = router;