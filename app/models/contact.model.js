"use strict";

const schema = require("../schemas/contact");
const commons = require("../services/commons");
const validator = require("../services/validator");
const LIMIT = 25;
class Contact {
  async count(query, auth) {
    try {
      commons.checkMultipleRole(auth, ["super"]);
      return await schema.count(query);
    } catch (e) {}
  }
  async create({ body }) {
    try {
      await validator.validateContact(body);
      return await schema.create(body);
    } catch (e) {
      throw e;
    }
  }

  async get({ query, auth }) {
    try {
      let { page, sortBy, sortDesc } = query;
      let sortField = sortBy && sortBy[0] ? sortBy[0] : "created_at";
      let desc = sortDesc && sortDesc[0] == "true" ? "descending" : "ascending";
      let sortData = {};
      sortData[sortField] = desc;
      let searchData = {
        deleted_at: null,
      };
      if (auth && !commons.isAdmin(auth)) {
        searchData["staff_id"] = auth._id;
      }
      let enquiries = await schema
        .find(searchData)
        .sort(sortData)
        .limit(LIMIT)
        .skip(LIMIT * parseInt(page - 1))
        .lean();
      return {
        docs: enquiries,
        limit: LIMIT,
        total: await schema.count(),
        page: page ? parseInt(page) : 0,
      };
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Contact;
