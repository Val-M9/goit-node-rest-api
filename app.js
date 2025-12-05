import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import { dbConnect } from "./db/dbConnect.js";
import { verifyTransport } from "./helpers/email/sendEmail.js";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRoutes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Uncomment the this block to sync models with the database or create new ones

// import { User } from "./db/models/UserModel.js";
// import { Contact } from "./db/models/ContactModel.js";

// User.sync({ alter: true });
// Contact.sync();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await dbConnect();

// Verify SMTP transport
try {
  await verifyTransport();
} catch (err) {
  console.error(
    `Warning: SMTP transport verify failed at startup. Email may not work: 
    ${err && err.code} ${err && err.message}`
  );
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
