import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ValidationError } from "sequelize";
import "dotenv/config";

import { dbConnect } from "./db/dbConnect.js";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.status = 400;
  }
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: "error",
    code: err.status || 500,
    message: err.message || "Server error",
  });
});

await dbConnect();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
