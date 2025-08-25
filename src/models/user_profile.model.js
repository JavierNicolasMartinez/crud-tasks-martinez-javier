import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const UserProfileModel = sequelize.define(
  "user_profile",
  {
    bio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    timestamps: false, 
  }
);

//Relación Uno a uno
UserProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
UserModel.hasOne(UserProfileModel, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});

// UserModel.addHook("afterDestroy", async (user) => {
//   console.log(user.dataValues.id);
//   const perfil = await UserProfileModel.findOne({
//     where: { user_id: user.dataValues.id },
//   });
//   await perfil.destroy();
// });
