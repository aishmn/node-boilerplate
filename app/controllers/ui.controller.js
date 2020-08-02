"use strict";

const user = new (require("../models/user.model"))();
const contact = new (require("../models/contact.model"))();

class UiController {
  async getDashboardStats(req, res) {
    try {
      let { auth } = req;
      let items = [];
      if (auth.default_role == "super") {
        let adminDatas = [
          {
            icon: "admin_panel_settings",
            title: "Admins",
            href: `users?k=default_role&v=super`,
            count: await user.count({ default_role: "super" }, auth),
          },

          {
            icon: "contacts",
            title: "Contact",
            href: `contacts`,
            count: await contact.count({}, auth),
          },
        ];
        items = adminDatas;
      } else {
        let staffData = [
          {
            icon: "local_mall",
            title: "Products",
            href: `products`,
            count: await product.count({ seller_id: auth._id }, auth),
          },
        ];
        items = staffData;
      }
      return res.status(200).send(items);
    } catch (e) {
      return res.status(400).send({ message: "Something went wrong" });
    }
  }

  getTopRightItems(req, res) {
    let { auth } = req;
    let items = [];
    if (auth.default_role == "staff") {
      items.push({
        title: "Manage Profile",
        action: "manageProfile",
      });
    }
    items.push({
      title: "Change Password",
      action: "changePassword",
    });
    items.push({
      title: "Logout",
      action: "logout",
    });
    return res.status(200).send(items);
  }

  getRoutes(req, res) {
    let items = [
      {
        title: "Dashboard",
        icon: "home",
        roles: ["super", "staff"],
        href: "/",
      },
      {
        title: "Users",
        icon: "people",
        roles: ["super"],
        href: "/users",
      },
      {
        title: "Contacts",
        icon: "contacts",
        roles: ["super"],
        href: "/contacts",
      },
    ];
    return res.status(200).send(items);
  }
}

module.exports = new UiController();
