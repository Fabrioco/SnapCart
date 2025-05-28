import nodemailer from "nodemailer";

export const transporterMail = nodemailer.createTransport({
  host: "smtp.gmail.com", // Exemplo: smtp.gmail.com, smtp.office365.com, etc.
  port: 587, // Geralmente 587 para TLS
  secure: false, // true para 465, false para outros
  auth: {
    user: "fabriciooliveiralopes50@gmail.com",
    pass: "rnbv tofg ubpu zbyr ", // Se usar Gmail, pode precisar criar app password
  },
});
