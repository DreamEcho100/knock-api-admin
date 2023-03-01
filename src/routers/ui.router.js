
const express = require("express");

const router = express.Router();

const uiController = require('../controllers/ui.controller');
const { isAuth } = require('../middlewares/auth');
const { upload } = require("../middlewares/upload");



// UI///ui/upload/image-main-section

router.post('/upload/image-main-section', isAuth , upload.single('mainImageUrl') , uiController.uploadImageMainSection);
router.put('/edit-main-section', isAuth , uiController.changeMainSection);
router.get('/get-main-section' , uiController.getMainSection);

// UI///ui/upload/image-main-section - knock page -main section

router.post('/upload/image-knock-main-section', isAuth , upload.single('mainImageUrl') , uiController.uploadKnockImageMainSection);
router.put('/edit-knock-main-section', isAuth , uiController.changeKnockMainSection);
router.get('/get-knock-main-section' , uiController.getKnockMainSection);

// UI///ui/upload/image-main-section - knock clipper page -main section

router.post('/upload/image-knock-clipper-main-section', isAuth , upload.single('mainImageUrl') , uiController.uploadKnockClipperImageMainSection);
router.put('/edit-knock-clipper-main-section', isAuth , uiController.changeKnockClipperMainSection);
router.get('/get-knock-clipper-main-section' , uiController.getKnockClipperMainSection);

// popup

router.post('/upload/image-popup', isAuth , upload.single('mainImageUrl') , uiController.uploadImagePopUp);
router.put('/edit-popup', isAuth , uiController.changePopUp);
router.get('/get-popup' , uiController.getPopUp);

// Banner 

router.put('/edit-banner' , isAuth , uiController.changeBanner)
router.get('/get-banner' , uiController.getBanner);


// Home Page 

router.post('/upload/image-homepage', isAuth , upload.single('imageUrl') , uiController.uploadHomePageImages);
router.put('/edit-homepage' , isAuth , uiController.editHomePage)
router.put('/change-sample-box' , isAuth , uiController.changeSampleBox)
router.get('/get-homepage' , uiController.getHomePage);

// Knock Page

router.get('/get-knockpage' , uiController.getKnockPage);
router.put('/edit-knockpage' , isAuth , uiController.editKnockPage)
router.post('/upload/image-knockpage', isAuth , upload.single('imageUrl') , uiController.uploadKnockPageImages);

// Knock Clipper

router.get('/get-knockclipperpage' , uiController.getKnockClipperPage);
router.put('/edit-knockclipperpage' , isAuth , uiController.editKnockClipperPage)
router.post('/upload/image-knockclipperpage', isAuth , upload.single('imageUrl') , uiController.uploadKnockClipperPageImages);



// DTK 

router.get('/get-DTK' , uiController.getDTK);
router.put('/edit-DTK' , isAuth , uiController.editDTK)
router.post('/upload/image-DTK', isAuth , upload.single('imageUrl') , uiController.uploadDTKImages);

// FAQ

router.get('/get-FAQ' , uiController.getFAQ);
router.put('/edit-FAQ' , isAuth , uiController.editFAQ)



module.exports = router;