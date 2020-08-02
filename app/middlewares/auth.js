"use strict";

const jwt = require("jsonwebtoken");

class AuthMiddleware {
  /**
   *
   * @param {Array} roles
   */
  handleAuth(roles) {
    return function (req, res, next) {
      try {
        let decoded = jwt.verify(
          req.headers.authorization,
          process.env.JWT_SECRET
        );
        let { user, ip } = decoded;
        if (
          user &&
          roles.includes(user.role ? user.role : user.default_role) 
        ) {
          req.auth = user;
          return next();
        }
        res.status(401).send({ message: "Unauthenticated" });
      } catch (e) {
        res.status(401).send({ message: "Unauthenticated" });
      }
    };
  }
}

module.exports = new AuthMiddleware();
