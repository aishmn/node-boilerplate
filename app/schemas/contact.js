const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    email: { type: JSON, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const collection = "contacts";

var model;
try {
  model = mongoose.model(Schema);
} catch (e) {
  model = mongoose.model(collection, Schema);
}

module.exports = model;
