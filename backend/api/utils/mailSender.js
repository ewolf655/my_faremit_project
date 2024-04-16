const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

async function sendVerificationEmail(_email, _otp) {
  try {
    let config = {
      host: "smtpout.secureserver.net", // GoDaddy SMTP server address
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    };

    console.log(process.env.MAIL_USER);
    console.log(process.env.MAIL_PASS);
    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Faremit",
        link: "https://faremit.com/",
      },
    });

    let response = {
      body: {
        name: "Admin",
        intro: `Your OTP is ${_otp}`,
        outro: "Embrace Digital Sovereignty",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.MAIL_USER, //admin
      to: _email,
      subject: "OTP Verification",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
    // const mailResponse = await mailSender(
    //   _email,
    //   "Verification Email",
    //   `<h1>Please confirm your OTP</h1>
    //    <p>Here is your OTP code: ${_otp}</p>`
    // );
    // console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}
module.exports = { sendVerificationEmail };
