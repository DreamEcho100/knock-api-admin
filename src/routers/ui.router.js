
const express = require("express");

const router = express.Router();

const uiController = require('../controllers/ui.controller');
const { isAuth } = require('../middlewares/auth');
const { upload } = require("../middlewares/upload");



// UI///ui/upload/image-main-section

router.post('/upload/image-main-section', isAuth , upload.single('mainImageUrl') , uiController.uploadImageMainSection);
router.put('/edit-main-section', isAuth , uiController.changeMainSection);
router.get('/get-main-section' , uiController.getMainSection);

// Banner 

router.put('/edit-banner' , isAuth , uiController.changeBanner)
router.get('/get-banner' , uiController.getBanner);

module.exports = router;