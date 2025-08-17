import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
// import { TaskTagsModel } from "./task_tags.model.js";
// import { TaskModel } from "./task.model.js";

export const TagModel = sequelize.define(
  "tag",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
