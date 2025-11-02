import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import { sequelize } from "./db/dbConnect.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
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

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);

    process.exitCode = 1;
    setTimeout(() => process.exit(1), 100);
  }
}

start();
