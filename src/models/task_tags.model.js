import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TaskModel } from "./task.model.js";
import { TagModel } from "./tag.model.js";

export const TaskTagsModel = sequelize.define(
  "task_tags",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//RELACIÓN MUCHOS A MUCHOS

TaskModel.belongsToMany(TagModel, {
  through: TaskTagsModel,
  foreignKey: "task_id",
  as: "tags",
});

TagModel.belongsToMany(TaskModel, {
  through: TaskTagsModel,
  foreignKey: "tag_id",
  as: "tasks",
});

TaskTagsModel.belongsTo(TagModel, {
  foreignKey: "tag_id",
  as: "tags",
});

TaskTagsModel.belongsTo(TaskModel, {
  foreignKey: "task_id",
  as: "tasks",
});

// TaskModel.hasMany(TaskTagsModel, {
//   foreignKey: "task_id",
//   as: "task_tag",
// });
// TagModel.hasMany(TaskTagsModel, {
//   foreignKey: "tag_id",
//   as: "task_tag",
// });
