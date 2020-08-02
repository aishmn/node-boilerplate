"use strict";

// const SellerProfile = require("../models/seller_profile");
// const ProductMedia = require("../models/profile_media.model");
// const Advertisement = require("../models/advertisement.model");

const dirs = {
  // logos: SellerProfile,
  // cover_images: SellerProfile,
  // product_images: ProductMedia,
  // product_videos: ProductMedia,
  // pan_cards: SellerProfile,
  // advertisements: Advertisement,
  // seller_product_advertisements: Advertisement,
};

class UploadController {
  async uploadFile(req, res) {
    try {
      let obj = new dirs[req.params.directory]();
      return res.status(201).send(await obj.upload(req));
    } catch (e) {
      if (`statusCode` in e) {
        return res.status(e.statusCode).send(e.message);
      }
      return res
        .status(400)
        .send({ message: "message" in e ? e.message : "Something went wrong" });
    }
  }

  async destroy(req, res) {
    try {
      let obj = new Document();
      return res.status(202).send(await obj.removeFile(req.params.id));
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

module.exports = new UploadController();
