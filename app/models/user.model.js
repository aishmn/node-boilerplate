"use strict";
const schema = require("../schemas/users");
const commons = require("../services/commons");
const validator = require("../services/validator");
const mailer = require("../services/mailer");
const LIMIT = 20;

class User {
  async createFirstAdmin() {
    try {
      let admin = await schema.create({
        email: "admin@manish.com",
        default_role: "super",
        password: await commons.hashPassword("password"),
      });
      return admin;
    } catch (e) {
      throw e;
    }
  }

  async count(query, auth) {
    try {
      commons.checkMultipleRole(auth, ["super", "staff"]);
      return await schema.count(query);
    } catch (e) {
      throw e;
    }
  }

  async get({ query, auth }) {
    try {
      commons.checkRole(auth, "super");
      let { page, sortBy, sortDesc, queries } = query;
      let sortField = sortBy && sortBy[0] ? sortBy[0] : "created_at";
      let desc = sortDesc && sortDesc[0] == "true" ? "descending" : "ascending";
      let sortData = {};
      sortData[sortField] = desc;
      let searchDatas = {
        ...{ _id: { $ne: auth._id } },
        ...commons.createSearchQuery(queries),
      };
      let users = await schema
        .find(searchDatas)
        .sort(sortData)
        .select("-password")
        .limit(LIMIT)
        .skip(LIMIT * parseInt(page - 1))
        .lean();
      return {
        docs: users,
        limit: LIMIT,
        total: await schema.where(searchDatas).count(),
        page: page ? parseInt(page) : 0,
      };
    } catch (e) {
      throw e;
    }
  }

  async getConfirmationEmail({ body }) {
    try {
      await validator.validateUser(body);
      let user = await schema.create(body);
      await mailer.registrationEmail(user);
      return { message: "User Confirmation email is sent" };
    } catch (e) {
      throw e;
    }
  }

  async verifyEmail({ body }) {
    try {
      await validator.emailVerification(body);
      let user = await schema.findOne({ _id: body.id, email: body.email });
      if (user == null) {
        throw {
          statusCode: 404,
          message: "User not found",
        };
      }
      await schema.find({ _id: body.id, email: body.email }).update({
        is_email_verified: true,
      });
      return { message: "Email successfully verified" };
    } catch (e) {
      throw e;
    }
  }

  async create({ body, auth }) {
    try {
      commons.checkRole(auth, "super");
      await validator.validateUser(body);
      return await schema.create({
        email: body.email,
        password: await commons.hashPassword(body.password.trim()),
        default_role: body.default_role,
      });
    } catch (e) {
      throw e;
    }
  }

  async findOneByQuery(query) {
    try {
      let user = await schema.findOne(query).lean();
      if (user == null) {
        throw {};
      }
      return user;
    } catch (e) {
      throw {
        statusCode: 400,
        message: "User not found",
      };
    }
  }

  async update({ body, auth, params }) {
    try {
      commons.checkRole(auth, "super");
      return await schema.findOneAndUpdate(
        { _id: params.id },
        {
          $set: body,
        },
        { new: true }
      );
    } catch (e) {
      throw e;
    }
  }

  async destroy({ query, auth }) {
    try {
      await validator.destroy(query);
      commons.checkRole(auth, "super");
      let { index_type, indexes } = query;
      await schema.where(index_type).in(indexes).deleteMany();
      return true;
    } catch (e) {
      throw e;
    }
  }

  async generateLoginToken({ body, ip }) {
    try {
      await validator.login(body);
      let user = await this.findOneByQuery({ email: body.email });
      let passwordStatus = await commons.checkPassword(
        body.password,
        user.password
      );
      if (!passwordStatus) {
        throw {
          statusCode: 401,
          message: "Invalid Credential",
        };
      }
      user.token = commons.getJwtToken(user, ip);
      return user;
    } catch (e) {
      throw e;
    }
  }

  async resetPassword({ body, auth }) {
    try {
      if (!auth) {
        throw {
          statusCode: 401,
          message: "Unauthenticated",
        };
      }
      await validator.resetPassword(body);
      let user = await this.findOneByQuery({ _id: auth._id });
      let passwordStatus = await commons.checkPassword(
        body.current_password,
        user.password
      );
      if (!passwordStatus) {
        throw {
          statusCode: 422,
          message: [
            {
              field: "current_password",
              message: "Current Password do not match",
            },
          ],
        };
      }
      return await schema.findOneAndUpdate(
        { _id: auth._id },
        {
          $set: { password: await commons.hashPassword(body.password.trim()) },
        },
        { new: true }
      );
    } catch (e) {
      throw e;
    }
  }
}

module.exports = User;
