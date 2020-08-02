const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    data: { type: JSON, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const collection = "email_logs";

var model;
try {
  model = mongoose.model(Schema);
} catch (e) {
  model = mongoose.model(collection, Schema);
}

module.exports = model;
