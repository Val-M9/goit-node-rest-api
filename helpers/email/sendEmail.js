import nodemailer from "nodemailer";

const createConfig = (port) => ({
  host: process.env.MAIL_HOST,
  port: Number(port),
  secure: Number(port) === 465,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
  // Timeouts to fail fast and produce clearer logs
  connectionTimeout: 5000,
  greetingTimeout: 2000,
  socketTimeout: 5000,
  logger: false,
  debug: false,
  tls: {
    // During debugging it can help to allow self-signed certs; leave false in production
    rejectUnauthorized: false,
  },
});

let transport = nodemailer.createTransport(
  createConfig(process.env.MAIL_PORT || 465)
);

export const verifyTransport = async () => {
  const configuredPort = Number(process.env.MAIL_PORT) || 465;
  try {
    await transport.verify();
    console.log(`SMTP transport verified on port ${configuredPort}`);
    return true;
  } catch (err) {
    console.error("SMTP verify failed:", err && err.code, err && err.message);

    // If initial attempt timed out or failed, try fallback to port 587 (STARTTLS)
    if (configuredPort !== 587) {
      console.log("Attempting fallback to port 587 (STARTTLS)");
      transport = nodemailer.createTransport(createConfig(587));
      try {
        await transport.verify();
        console.log("SMTP transport verified on fallback port 587");
        return true;
      } catch (err2) {
        console.error(
          "Fallback SMTP verify failed:",
          err2 && err2.code,
          err2 && err2.message
        );
        throw err2;
      }
    }

    throw err;
  }
};

export const sendEmail = async (payload) => {
  try {
    const email = { ...payload, from: process.env.MAIL_ADDRESS };
    return await transport.sendMail(email);
  } catch (error) {
    console.error(
      "Error sending email: ",
      error && error.code,
      error && error.message
    );
    throw error;
  }
};
