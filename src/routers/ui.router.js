const express = require("express");

const router = express.Router();

const uiController = require("../controllers/ui.controller");
const { isAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");

// reset review

router.get("/reset-review", isAuth, uiController.resetReviews);

// UI///ui/upload/image-main-section

router.post(
  "/upload/image-main-section",
  isAuth,
  upload.single("mainImageUrl"),
  uiController.uploadImageMainSection
);
router.put("/edit-main-section", isAuth, uiController.changeMainSection);
router.get("/get-main-section", uiController.getMainSection);
router.get("/reset-main", isAuth, uiController.resetMainSection);

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
router.get("/reset-popup", isAuth, uiController.resetPopUp);

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
router.get("/reset-home-page", isAuth, uiController.resetHomePageSections);

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
router.get("/reset-knockpage", isAuth, uiController.resetKnockPageSection);
router.post('/add-system-requirements-bullet-knock' , isAuth , uiController.addSystemRequirmentsKnock)
router.delete('/remove-system-requirements-bullet-knock' , isAuth , uiController.removeSystemRequirmentsKnock)

// Knock Clipper

router.get("/get-knockclipperpage", uiController.getKnockClipperPage);
router.put("/edit-knockclipperpage", isAuth, uiController.editKnockClipperPage);
router.post(
  "/upload/image-knockclipperpage",
  isAuth,
  upload.single("imageUrl"),
  uiController.uploadKnockClipperPageImages
);

router.get(
  "/reset-knockclipperpage",
  isAuth,
  uiController.resetKnockClipperPageSection
);
router.post('/add-system-requirements-bullet-knock-clipper' , isAuth , uiController.addSystemRequirmentsKnockClipper)
router.delete('/remove-system-requirements-bullet-knock-clipper' , isAuth , uiController.removeSystemRequirmentsKnockClipper)

// DTK

router.get("/get-DTK", uiController.getDTK);
router.put("/edit-DTK", isAuth, uiController.editDTK);
router.post(
  "/upload/image-DTK",
  isAuth,
  upload.single("imageUrl"),
  uiController.uploadDTKImages
);
router.get("/reset-DTK", isAuth, uiController.resetDTK);
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
router.get("/reset-FAQ", isAuth, uiController.resetFAQ);
router.put("/edit-FAQ", isAuth, uiController.editFAQ);
router.post("/add-FAQ", isAuth, uiController.addFAQ);
router.post("/add-FAQ-list", isAuth, uiController.addFAQList);
router.delete("/remove-FAQ", isAuth, uiController.removeFAQ);
router.delete("/remove-FAQ-list", isAuth, uiController.removeFAQlist);

// Terms of service

router.get("/get-terms-of-service", uiController.getTermsOfService);
router.get("/reset-terms-of-service", isAuth, uiController.resetTermsOfService);
router.put("/edit-terms-of-service", isAuth, uiController.editTermsOfService);

// Shipping policy

router.get("/get-shipping-policy", uiController.getShippingPolicy);
router.get("/reset-shipping-policy", isAuth, uiController.resetShippingPolicy);
router.put("/edit-shipping-policy", isAuth, uiController.editShippingPolicy);

// Refund policy

router.get("/get-refund-policy", uiController.getRefundPolicy);
router.get("/reset-refund-policy", isAuth, uiController.resetRefundPolicy);
router.put("/edit-refund-policy", isAuth, uiController.editRefundPolicy);

// privacy policy

router.get("/get-privacy-policy", uiController.getPrivacyPolicy);
router.get("/reset-privacy-policy", uiController.resetPrivacyPolicy);
router.put("/edit-privacy-policy", isAuth, uiController.editPrivacyPolicy);


// upselling popup 

router.get("/get-upselling-popup", uiController.getUpSellingPopup);
router.post("/add-upselling-product", isAuth, uiController.addUpSellingPopup);
router.put("/edit-upselling-product", isAuth, uiController.editUpSellingPopup);
router.put("/edit-upselling-product-settings", isAuth, uiController.editUpSellingPopupSettings);
router.delete("/delete-upselling-product", isAuth, uiController.deleteUpSellingPopup);

module.exports = router;
