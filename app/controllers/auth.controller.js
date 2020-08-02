"use strict";

const user = new (require("../models/user.model"))();

class AuthController {
  async login(req, res) {
    try {
      return res.status(201).send(await user.generateLoginToken(req));
    } catch (e) {
      if (`statusCode` in e) {
        return res.status(e.statusCode).send({ error: e.message });
      }
      return res
        .status(400)
        .send({ message: "message" in e ? e.message : "Something went wrong" });
    }
  }

  async register(req, res) {
    try {
      return res.status(201).send(await user.getConfirmationEmail(req));
    } catch (e) {
      if (`statusCode` in e) {
        return res.status(e.statusCode).send({ error: e.message });
      }
      return res
        .status(400)
        .send({ message: "message" in e ? e.message : "Something went wrong" });
    }
  }

  async verifyEmail(req, res) {
    try {
      return res.status(201).send(await user.verifyEmail(req));
    } catch (e) {
      if (`statusCode` in e) {
        return res.status(e.statusCode).send({ error: e.message });
      }
      return res
        .status(400)
        .send({ message: "message" in e ? e.message : "Something went wrong" });
    }
  }

  async resetPassword(req, res) {
    try {
      return res.status(201).send(await user.resetPassword(req));
    } catch (e) {
      if (`statusCode` in e) {
        return res.status(e.statusCode).send(e.message);
      }
      return res
        .status(400)
        .send({ message: "message" in e ? e.message : "Something went wrong" });
    }
  }
}

module.exports = new AuthController();
