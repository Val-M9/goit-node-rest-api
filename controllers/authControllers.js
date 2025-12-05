import * as authService from "../services/authServices.js";

export const registerUser = async (req, res) => {
  const result = await authService.registerUser(req.body);
  return res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

export const verifyUserEmail = async (req, res) => {
  const { verificationToken } = req.params;
  await authService.verifyUserEmail(verificationToken);
  return res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

export const resendVerificationEmail = async (req, res) => {
  await authService.resendVerificationEmail(req.body);
  return res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

export const loginUser = async (req, res) => {
  const result = await authService.loginUser(req.body);
  return res.status(200).json({
    status: "success",
    code: 200,
    token: result.token,
    user: result.user,
  });
};

export const getCurrentUser = async (req, res) => {
  const { email, subscription } = await authService.refreshUser(req.user);

  return res.status(200).json({
    status: "success",
    email,
    subscription,
  });
};

export const updateUserSubscription = async (req, res) => {
  const { email, subscription } = await authService.updateUserSubscription(
    req.user.email,
    req.body.subscription
  );

  return res.json({
    status: "success",
    code: 200,
    email,
    subscription,
  });
};

export const updateUserAvatar = async (req, res) => {
  const avatarURL = await authService.updateUserAvatar(req.user, req.file);

  return res.json({
    status: "success",
    code: 200,
    avatarURL,
  });
};

export const logoutUser = async (req, res) => {
  await authService.logoutUser(req.user);

  return res.json(204).send();
};
