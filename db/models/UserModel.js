import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { subscriptionTypes } from "../../constants/userSettings.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email already in use!",
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: subscriptionTypes,
    defaultValue: subscriptionTypes[0],
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

User.sync();
