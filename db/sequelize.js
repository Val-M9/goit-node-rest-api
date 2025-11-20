import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === "production";

const connectioParams = isProduction
  ? {
      dialect: "postgres",
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    }
  : {
      dialect: "postgres",
      username: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASSWORD,
      host: process.env.DB_DEV_HOST,
      port: process.env.DB_DEV_PORT,
      database: process.env.DB_DEV_NAME,
    };

export const sequelize = new Sequelize({
  ...connectioParams,
  logging: false,
});
