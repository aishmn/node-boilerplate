"use strict";
const user = new (require("../models/user.model"))();

class UserController {
  async createFirstAdmin(req, res) {
    return await res.status(201).send(await user.createFirstAdmin());
  }
}

module.exports = new UserController();
