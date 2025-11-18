import { User } from "../db/models/UserModel.js";

async function register(password, email) {
  const createUser = await User.create();
}
