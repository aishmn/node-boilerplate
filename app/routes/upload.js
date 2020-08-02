const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
multer({ dest: "uploads/" });
const fs = require("fs");
const UserMiddleware = require("../middlewares/attachAuth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file) {
      let dir = `uploads/${req.params.directory}`;
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + req.auth._id.toString() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const UploadController = require("../controllers/upload.controller");

router.post(
  "/upload/:directory",
  UserMiddleware.attachAuth(),
  upload.single("file"),
  UploadController.uploadFile
);

router.delete(
  "/file/:id",
  UserMiddleware.attachAuth(),
  UploadController.destroy
);

module.exports = router;
