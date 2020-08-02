require("dotenv").config();
const app = require("./config/express");
app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Server is running at ${process.env.PORT} in ${process.env.NODE_ENV} mode...`
  )
);
module.exports = app;
