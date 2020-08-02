"use strict";
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;
const dateKeys = ["created_at", "updated_at"];
const JWT = require("jsonwebtoken");

class Commons {
  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  checkPassword(password, hashedPassword) {
    let status = bcrypt.compare(password, hashedPassword);
    return status;
  }

  getJwtToken(payload, ip) {
    let token = JWT.sign({ user: payload, ip: ip }, process.env.JWT_SECRET);
    return token;
  }

  checkMultipleRole(user, roles) {
    try {
      if (user && roles.includes(user.default_role)) {
        return true;
      }
      throw {};
    } catch (e) {
      throw {
        statusCode: 401,
        message: "Unauthenticated",
      };
    }
  }

  checkRole(user, role) {
    try {
      if (user && user.default_role == role) {
        return true;
      }
      throw {};
    } catch (e) {
      throw {
        statusCode: 401,
        message: "Unauthenticated",
      };
    }
  }

  isAdmin(user) {
    try {
      if (user && user.default_role == "super") {
        return true;
      }
      throw false;
    } catch (e) {
      return false;
    }
  }

  _advertisementQuery(inputs, key) {
    if (inputs[key] == "featured") {
      return {
        featured: true,
      };
    }
    if (inputs[key] == "expired") {
      return {
        expiry_date: {
          $lt: new Date(),
        },
      };
    }
    return {};
  }

  createSearchQuery(inputs, collection) {
    if (!inputs) {
      return {};
    }
    let q = [];
    let queries = JSON.parse(inputs);
    for (var key in queries) {
      if (key == "email") {
        q.push({
          email: {
            $regex: queries[key],
            $options: "i",
          },
        });
      } else if (collection == "advertisements" && key == "status") {
        q.push(this._advertisementQuery(queries, key));
      } else if (key == "default_role") {
        if (queries[key] != "all") {
          q.push({
            default_role: queries[key],
          });
        }
      } else if (dateKeys.includes(key)) {
        let dateObj = {};
        dateObj[key] = {
          $gte: new Date(new Date(queries[key])),
          $lt: new Date(),
        };
        q.push(dateObj);
      } else {
        let obj = {};
        obj[key] = queries[key];
        q.push(obj);
      }
    }
    return q.length === 0
      ? {}
      : {
          $and: q,
        };
  }

  formatDate(inputDate) {
    let date = new Date(inputDate);
    let formattedDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formattedDate;
  }
}

module.exports = new Commons();
