"use strict";

const jwt = require("jsonwebtoken");

class UserMiddleware {
  attachAuth() {
    return function (req, res, next) {
      try {
        let decoded = jwt.verify(
          req.headers.authorization,
          process.env.JWT_SECRET
        );
        let { user, ip } = decoded;
        req.auth = user;
        return next();
      } catch (e) {
        req.auth = undefined;
        return next();
      }
    };
  }
}

module.exports = new UserMiddleware();
