import gravatar from "gravatar";

export const defaultAvatarURL = (email) => {
  return gravatar.url(email, { s: "250" }, true);
};
