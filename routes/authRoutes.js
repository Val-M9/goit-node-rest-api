import express from "express";

const authRouter = express.Router();

// Temporary placeholder handler to avoid startup errors when route
// implementation is not yet provided. Replace with your real
// controller (e.g. import { register } from '../controllers/authController.js')
// when available.
authRouter.post("/register", async (req, res) => {
  return res.status(501).json({ message: "Not implemented" });
});

export default authRouter;
