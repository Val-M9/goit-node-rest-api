import bcrypt from "bcrypt";
import { User } from "../db/models/UserModel.js";

export async function register(payload) {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  return await User.create({ ...payload, password: hashPassword });
}
