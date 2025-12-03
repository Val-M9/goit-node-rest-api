import express from "express";
import * as authController from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
import { createUserSchema, loginUserSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(createUserSchema),
  authController.registerUser
);

authRouter.post(
  "/login",
  validateBody(loginUserSchema),
  authController.loginUser
);

authRouter.get("/current", authenticate, authController.getCurrentUser);

authRouter.patch(
  "/subscription",
  authenticate,
  authController.updateUserSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateUserAvatar
);

authRouter.post("/logout", authenticate, authController.logoutUser);

export default authRouter;
