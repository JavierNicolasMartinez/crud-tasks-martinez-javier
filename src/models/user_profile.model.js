import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const UserProfileModel = sequelize.define("user_profile", {
  bio: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(),
   allowNull: false,
  },
},
{
  timestamps: false,
});

//Relación Uno a uno
UserProfileModel.belongsTo(UserModel, {foreignKey: "user_id", as: "user"});
UserModel.hasOne(UserProfileModel, {foreignKey: "user_id", as: "profile"});
