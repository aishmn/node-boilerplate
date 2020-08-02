const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send({
    message: "BACKEND BOILERPLATE BY MANISH YADAV",
    environment: process.env.NODE_ENV,
  });
});

module.exports = router;
