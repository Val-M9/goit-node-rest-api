import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import { dbConnect } from "./db/dbConnect.js";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRoutes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await dbConnect();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
