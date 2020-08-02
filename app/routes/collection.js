const express = require("express");
const router = express.Router();
const UserMiddleware = require("../middlewares/attachAuth");
const CollectionController = require("../controllers/collection.controller");

router.get(
  "/:collection",
  UserMiddleware.attachAuth(),
  CollectionController.index
);

router.get(
  "/show/:collection",
  UserMiddleware.attachAuth(),
  CollectionController.show
);

router.post(
  "/:collection",
  UserMiddleware.attachAuth(),
  CollectionController.store
);

router.patch(
  "/:collection/:id",
  UserMiddleware.attachAuth(),
  CollectionController.update
);

router.delete(
  "/:collection",
  UserMiddleware.attachAuth(),
  CollectionController.destroy
);

module.exports = router;
