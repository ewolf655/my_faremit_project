const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/auth");

router.post("/login", authController.login);

router.route("/signup").post(authController.register);

router
  .route("/")
  .get(authController.protect,userController.getUsers)
  .post(userController.createUser)
  .patch(userController.updateUser);
router
  .route("/verif/status")
  .patch(authController.protect,userController.updateVerificationStatus);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
