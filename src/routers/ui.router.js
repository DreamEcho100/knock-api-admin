const express = require("express");

const router = express.Router();

const uiController = require("../controllers/ui.controller");
const { isAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");

// UI///ui/upload/image-main-section

router.post(
  "/upload/image-main-section",
  isAuth,
  upload.single("mainImageUrl"),
  uiController.uploadImageMainSection
);
router.put("/edit-main-section", isAuth, uiController.changeMainSection);
router.get("/get-main-section", uiController.getMainSection);

// UI///ui/upload/image-main-section - knock page -main section

router.post(
  "/upload/image-knock-main-section",
  isAuth,
  upload.single("mainImageUrl"),
  uiController.uploadKnockImageMainSection
);
router.put(
  "/edit-knock-main-section",
  isAuth,
  uiController.changeKnockMainSection
);
router.get("/get-knock-main-section", uiController.getKnockMainSection);

// UI///ui/upload/image-main-section - knock clipper page -main section

router.post(
  "/upload/image-knock-clipper-main-section",
  isAuth,
  upload.single("mainImageUrl"),
  uiController.uploadKnockClipperImageMainSection
);
router.put(
  "/edit-knock-clipper-main-section",
  isAuth,
  uiController.changeKnockClipperMainSection
);
router.get(
  "/get-knock-clipper-main-section",
  uiController.getKnockClipperMainSection
);

// popup

router.post(
  "/upload/image-popup",
  isAuth,
  upload.single("mainImageUrl"),
  uiController.uploadImagePopUp
);
router.put("/edit-popup", isAuth, uiController.changePopUp);
router.get("/get-popup", uiController.getPopUp);

// Banner

router.put("/edit-banner", isAuth, uiController.changeBanner);
router.get("/get-banner", uiController.getBanner);

// Home Page

router.post(
  "/upload/image-homepage",
  isAuth,
  upload.single("imageUrl"),
  uiController.uploadHomePageImages
);
router.put("/edit-homepage", isAuth, uiController.editHomePage);
router.put("/change-sample-box", isAuth, uiController.changeSampleBox);
router.get("/get-homepage", uiController.getHomePage);

// Knock Page

router.get("/get-knockpage", uiController.getKnockPage);
router.put("/edit-knockpage", isAuth, uiController.editKnockPage);
router.post(
  "/upload/image-knockpage",
  isAuth,
  upload.single("imageUrl"),
  uiController.uploadKnockPageImages
);
router.post(
  "/add-review-knockpage",
  isAuth,
  upload.single("imageUrl"),
  uiController.addKnockReview
);

router.delete("/remove-review", isAuth, uiController.removeKnockReview);

// Knock Clipper

router.get("/get-knockclipperpage", uiController.getKnockClipperPage);
router.put("/edit-knockclipperpage", isAuth, uiController.editKnockClipperPage);
router.post(
  "/upload/image-knockclipperpage",
  isAuth,
  upload.single("imageUrl"),
  uiController.uploadKnockClipperPageImages
);

// DTK

router.get("/get-DTK", uiController.getDTK);
router.put("/edit-DTK", isAuth, uiController.editDTK);
router.post(
  "/upload/image-DTK",
  isAuth,
  upload.single("imageUrl"),
  uiController.uploadDTKImages
);

router.post(
  "/add-review-DTK",
  isAuth,
  upload.single("imageUrl"),
  uiController.addDTKreview
);

// DTK product

router.get("/get-DTK-product", uiController.getDTKproduct);
router.post("/add-DTK-product-feature", isAuth, uiController.addDTKfeature);
router.post(
  "/add-DTK-product-artist",
  isAuth,
  upload.single("imageUrl"),
  uiController.addArtist
);
router.delete(
  "/remove-DTK-product-feature",
  isAuth,
  uiController.removeDTKfeature
);
router.post(
  "/add-DTK-product-files-included",
  isAuth,
  uiController.addFilesIncluded
);
router.delete(
  "/remove-DTK-product-files-included",
  isAuth,
  uiController.removeFilesIncluded
);
router.post(
  "/add-DTK-product-youtube-video",
  isAuth,
  uiController.addYoutubeVideo
);
router.delete(
  "/remove-DTK-product-youtube-video",
  isAuth,
  uiController.removeYoutubeVideo
);
router.put("/edit-DTK-product", isAuth, uiController.editDTKproduct);

router.delete("/remove-artist", isAuth, uiController.removeArtist);

// FAQ

router.get("/get-FAQ", uiController.getFAQ);
router.put("/edit-FAQ", isAuth, uiController.editFAQ);

// Terms of service

router.get("/get-terms-of-service", uiController.getTermsOfService);
router.put("/edit-terms-of-service", isAuth, uiController.editTermsOfService);

// Shipping policy

router.get("/get-shipping-policy", uiController.getShippingPolicy);
router.put("/edit-shipping-policy", isAuth, uiController.editShippingPolicy);

// Refund policy

router.get("/get-refund-policy", uiController.getRefundPolicy);
router.put("/edit-refund-policy", isAuth, uiController.editRefundPolicy);

// privacy policy

router.get("/get-privacy-policy", uiController.getPrivacyPolicy);
router.put("/edit-privacy-policy", isAuth, uiController.editPrivacyPolicy);

module.exports = router;
