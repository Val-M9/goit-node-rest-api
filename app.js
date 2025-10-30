import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";

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

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
