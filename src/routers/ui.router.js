
const express = require("express");

const router = express.Router();

const uiController = require('../controllers/ui.controller');
const { isAuth } = require('../middlewares/auth');



// UI

router.put('/edit-home', isAuth , uiController.changeHomePage);
router.get('/get-home' , uiController.getHomePage);

// Banner 

router.put('/edit-banner' , isAuth , uiController.changeBanner)
router.post('/add-banner' , isAuth , uiController.addBanner)
router.get('/get-banner' , uiController.getBanner);

module.exports = router;