import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcrypt";
import { User } from "../db/models/UserModel.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import { defaultAvatarURL } from "../helpers/defaultAvatar.js";

const avatarsDir = path.resolve("public", "avatars");

export const findUser = async (query) => User.findOne({ where: query });

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  return await User.create({
    ...payload,
    password: hashPassword,
    avatarURL: defaultAvatarURL(payload.email),
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Incorrect email or password");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Incorrect email or password");

  const tokenData = {
    id: user.id,
  };

  const token = createToken(tokenData);
  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const refreshUser = async (user) => {
  const token = createToken({ id: user.id });
  await user.update({ token });

  return {
    email: user.email,
    subscription: user.subscription,
  };
};

export const updateUserSubscription = async (email, newSubscription) => {
  try {
    const user = await findUser({ email });
    user.subscription = newSubscription;
    await user.save();

    return user;
  } catch (error) {
    console.error("Error while updating subscription: ", error);
    throw error;
  }
};

export const updateUserAvatar = async (user, file) => {
  let avatar = null;
  try {
    const newPath = path.join(avatarsDir, `${user.id}_${file.filename}`);
    await fs.rename(file.path, newPath);
    avatar = path.posix.join("/avatars", `${user.id}_${file.filename}`);
    user.avatarURL = avatar;

    await user.save();
    return avatar;
  } catch (error) {
    console.error("Error while updating avatar: ", error);
    throw error;
  }
};

export const logoutUser = async (user) => {
  await user.update({ token: null });
};
