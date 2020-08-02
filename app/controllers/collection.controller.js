"use strict";

const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const models = {
  users: User,
  contacts: Contact,
};

class CollectionController {
  async index(req, res) {
    try {
      let obj = new models[req.params.collection]();
      return res.status(200).send(await obj.get(req));
    } catch (e) {
      if (`statusCode` in e) {
        return res.status(e.statusCode).send(e.message);
      }
      return res
        .status(400)
        .send({ message: "message" in e ? e.message : "Something went wrong" });
    }
  }

  async show(req, res) {
    try {
      let obj = new models[req.params.collection]();
      return res.status(200).send(await obj.findByQueryWithRelations(req));
    } catch (e) {
      if (`statusCode` in e) {
        return res.status(e.statusCode).send(e.message);
      }
      return res
        .status(400)
        .send({ message: "message" in e ? e.message : "Something went wrong" });
    }
  }

  async store(req, res) {
    try {
      let obj = new models[req.params.collection]();
      return res.status(201).send(await obj.create(req));
    } catch (e) {
      if (`statusCode` in e) {
        return res.status(e.statusCode).send(e.message);
      }
      return res
        .status(400)
        .send({ message: "message" in e ? e.message : "Something went wrong" });
    }
  }

  async update(req, res) {
    try {
      let obj = new models[req.params.collection]();
      return res.status(201).send(await obj.update(req));
    } catch (e) {
      if (`statusCode` in e) {
        return res.status(e.statusCode).send(e.message);
      }
      return res.status(400);
    }
  }

  async destroy(req, res) {
    try {
      let obj = new models[req.params.collection]();
      return res.status(202).send(await obj.destroy(req));
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

module.exports = new CollectionController();
