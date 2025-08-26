import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const TaskModel = sequelize.define(
  "task",
  {
    title: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);
 //UNO A MUCHOS
TaskModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
  // onDelete: "CASCADE",
});
UserModel.hasMany(TaskModel, {
  foreignKey: "user_id",
  as: "tasks",
  // onDelete: "CASCADE",
});

// UserModel.addHook("afterDestroy", async (user) => {
//   console.log(user.dataValues.id);
//   const tarea = await TaskModel.findOne({
//     where: { user_id: user.dataValues.id },
//   });
//   await tarea.destroy();
// });
