const express = require("express");

const router = express.Router();

const authController = require('../controllers/auth.controller.js');
const { isAuth  } = require('../middlewares/auth');


router.get('/check-token', isAuth, authController.checkToken);
router.get("/logout", isAuth, authController.logout);

router.post('/login', authController.login);
router.post('/send-verification-code', authController.sendVerificationCode);


module.exports = router;