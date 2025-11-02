import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const connectionString = isProduction
  ? process.env.DATABASE_URL
  : process.env.DEV_DATABASE_URL;

export const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectOptions: isProduction
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
  logging: false,
});
