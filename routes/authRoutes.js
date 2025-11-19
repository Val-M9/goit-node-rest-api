import express from "express";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema } from "../schemas/authSchemas.js";
import { registerUser } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), registerUser);

export default authRouter;
