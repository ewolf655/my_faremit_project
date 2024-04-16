const express = require("express");
const multer = require("multer");
const countriesController = require("../controllers/countries");
const authController = require("../controllers/auth");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// router.post('/country',authController.protect, authController.restrictTo("admin"),upload.single('countryImage'), countriesController.uploadCountry);
// router.put('/country/:id',authController.protect,authController.restrictTo("admin"), upload.single('countryImage'), countriesController.updateCountryById);
// router.delete('/country/:id',authController.protect, authController.restrictTo("admin"),countriesController.deleteCountryById);
router.get(
  "/country",
  // authController.protect,
  countriesController.getAllCountries
);
router.get("/country/:id", countriesController.getCountryById);
router.post(
  "/country",
  // authController.protect,
  upload.single("countryImage"),
  countriesController.uploadCountry
);
router.put(
  "/country/:id",
  // authController.protect,
  upload.single("countryImage"),
  countriesController.updateCountryById
);
router.delete(
  "/country/:id",
  // authController.protect,
  countriesController.deleteCountryById
);

module.exports = router;
