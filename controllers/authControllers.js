import { register } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

export const registerUser = async (req, res) => {
  const result = await register(req.body);
  return res.status(201).json({
    status: "success",
    code: 201,
    email: result.email,
  });
};
