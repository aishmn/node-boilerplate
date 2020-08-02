const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  process.env.NODE_ENV == "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ methods: "GET,HEAD,PUT,PATCH,POST,DELETE", origin: "*" }));
app.use("/uploads", express.static("uploads"));
const adminRoutes = require("../app/routes/admin");
const authRoutes = require("../app/routes/auth");
const uploadRoutes = require("../app/routes/upload");
const uiRoutes = require("../app/routes/ui");
app.use(adminRoutes);
app.use(authRoutes);
app.use(uploadRoutes);
app.use(uiRoutes);
app.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = app;
