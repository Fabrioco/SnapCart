import nodemailer from "nodemailer";

export const transporterMail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "fabriciooliveiralopes50@gmail.com",
    pass: process.env.GOOGLE_PASS_KEY,
  },
});
