export const verifyEmailTemplate = (email, verificationToken) => {
  const verifyUrl = new URL(
    `api/auth/verify/${encodeURIComponent(verificationToken)}`,
    process.env.PUBLIC_URL
  ).toString();

  return {
    to: email,
    subject: "Please verify your email",
    html: `<p>Click <a target="_blank" href="${verifyUrl}">here</a> to verify your email.</p>`,
  };
};
