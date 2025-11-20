import { sequelize } from "./sequelize.js";

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exitCode = 1;
  }
};
