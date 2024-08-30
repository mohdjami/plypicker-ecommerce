import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const sendEmail = (options) => {
  //create transporter
  //define email options
  //actually send the email
};
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export default async function sendOneTimeLink(email) {
  try {
    // Generate a one-time token with a short expiration time
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Construct the verification link
    const link = `${process.env.CLIENT_URL}/verify?token=${token}`;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click <a href="${link}">here</a> to verify your email. This link will expire in 15 minutes.</p>`,
    };
    let subject = "Verify Your Email";

    let text = "Please verify your email by clicking on this link";
    let html = `<p>Click <a href="${link}">here</a> to verify your email. This link will expire in 15 minutes.</p>`;
    // Send email
    const url = process.env.EMAIL_SERVER_URL;
    const response = await fetch(url, subject, text, html);
    const data = await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send verification email");
  }
}
