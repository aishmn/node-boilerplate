"use strict";
const { validator } = require("indicative");

class Validator {
  async login(inputs) {
    try {
      let rules = {
        email: "required|email",
        password: "required",
      };
      let messages = {
        "email.required": "Email is required",
        "email.email": "Email is invalid",
        "password.required": "Password is required",
      };
      return await validator.validateAll(inputs, rules, messages);
    } catch (e) {
      throw {
        statusCode: 422,
        message: e,
      };
    }
  }

  async validateUser(inputs) {
    try {
      let rules = {
        email: "required|email",
        password: "required",
        password: "required|confirmed|min:6",
        default_role: "required",
      };
      let messages = {
        "email.required": "Email is required",
        "password.required": "Password required",
        "password.confirmed": "Password dont match",
        "password.min": "Password must have at least 6 characters",
        "default_role.required": "Default role is required",
      };
      return await validator.validateAll(inputs, rules, messages);
    } catch (e) {
      throw {
        statusCode: 422,
        message: e,
      };
    }
  }

  async emailVerification(inputs) {
    try {
      let rules = {
        email: "required|email",
        id: "required",
      };
      let messages = {
        "email.required": "Email is required",
        "id.required": "User information  is required",
      };
      return await validator.validateAll(inputs, rules, messages);
    } catch (e) {
      throw {
        statusCode: 422,
        message: e,
      };
    }
  }
  async destroy(inputs) {
    try {
      let rules = {
        index_type: "required",
        indexes: "required|array",
      };
      let messages = {
        "index_type.required": "Index type is required like _id, slug",
        "indexes.required": "Indexes values are required",
        "indexes.array": "Indexes should be an array",
      };
      return await validator.validateAll(inputs, rules, messages);
    } catch (e) {
      throw {
        statusCode: 422,
        message: e,
      };
    }
  }

  async resetPassword(inputs) {
    try {
      let rules = {
        current_password: "required",
        password: "required",
        password: "required|confirmed|min:6",
      };
      let messages = {
        "current_password.required": "Current Password is required",
        "password.confirmed": "Password dont match",
        "password.min": "Password must have at least 6 characters",
      };
      return await validator.validateAll(inputs, rules, messages);
    } catch (e) {
      throw {
        statusCode: 422,
        message: e,
      };
    }
  }

  async validateContact(inputs) {
    try {
      let rules = {
        email: "required",
        full_name: "required",
        phone: "required",
        message: "required",
      };
      let message = {
        "full_name.required": "Full name is required",
        "email.required": "Email address is required",
        "phone.required": "Phone number is required",
        "message.required": "Message is required",
      };
      return await validator.validateAll(inputs, rules, message);
    } catch (e) {
      throw {
        statusCode: 422,
        message: e,
      };
    }
  }
}

module.exports = new Validator();
