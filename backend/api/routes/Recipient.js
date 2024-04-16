const express = require("express");
const router = express.Router();
const RecipientController = require("../controllers/Recipient");
const authController = require("../controllers/auth");

router
  .route("/")
  .get(authController.protect, RecipientController.getRecipients)
  .post(authController.protect, RecipientController.createRecipient);

// router
//   .route("/:id")
//   .get(RecipientController.getRecipient)
//   // .delete(RecipientController.deleteRecipient);

module.exports = router;
