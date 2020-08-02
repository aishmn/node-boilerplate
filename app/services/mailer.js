const nodemailer = require("nodemailer");
const logSchema = require("../schemas/email_log");

class Mailer {
  constructor() {
    this.config = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });
  }

  /**
   * @param {Object} email
   * TODO remains to fill content
   */
  async registrationEmail({ _id, email }) {
    try {
      let vierificationLink = `${process.env.CORS_ORIGIN}/verify/?id=${_id}&email=${email}`;
      let data = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Email Verification ✔",
      };
      await this.config.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: `<a href=${vierificationLink}>Click Here</a>`,
      });
      await logSchema.create({
        user_id: _id,
        data: JSON.stringify(data),
      });
    } catch (e) {}
  }
}

module.exports = new Mailer();
