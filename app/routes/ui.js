const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");
const UiController = require("../controllers/ui.controller");

router.get(
  "/right-items/topbar",
  AuthMiddleware.handleAuth(["super", "staff"]),
  UiController.getTopRightItems
);

router.get(
  "/left-items/routes",
  AuthMiddleware.handleAuth(["super", "staff"]),
  UiController.getRoutes
);

router.get(
  "/stats",
  AuthMiddleware.handleAuth(["super", "staff"]),
  UiController.getDashboardStats
);
module.exports = router;
