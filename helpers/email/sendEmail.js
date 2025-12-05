import nodemailer from "nodemailer";

const nodeMailerConfig = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodeMailerConfig);

export const sendEmail = async (payload) => {
  try {
    const email = { ...payload, from: process.env.MAIL_ADDRESS };
    return await transport.sendMail(email);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
