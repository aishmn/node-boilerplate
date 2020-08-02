const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const UserMiddleware = require("../middlewares/attachAuth");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/verify-email", AuthController.verifyEmail);

router.post(
  "/reset-password",
  UserMiddleware.attachAuth(),
  AuthController.resetPassword
);

router.post(
  "/change_password",
  UserMiddleware.attachAuth(),
  AuthController.resetPassword
);

module.exports = router;
