const mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

const Schema = new mongoose.Schema(
  {
    email: { type: String, required: [true, "Provide Email"], unique: true },
    default_role: {
      type: String,
      default: "staff",
      enum: ["super", "staff"], //both means role of hirer and worcker
    },
    password: { type: String, required: false },
    is_email_verified: { type: Boolean, default: false },
    social_id: { type: String, required: false },
    social_type: { type: String, required: false },
    blocked: { type: Boolean, default: false },
    expiry_date: { type: Date, default: null, required: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

Schema.plugin(uniqueValidator, {
  message: "{PATH} already exists.",
});

const collection = "users";

var model;
try {
  model = mongoose.model(Schema);
} catch (e) {
  model = mongoose.model(collection, Schema);
}

module.exports = model;
