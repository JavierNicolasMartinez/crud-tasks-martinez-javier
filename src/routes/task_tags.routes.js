import express from "express";
import {
  createTaskTag,
  taskTagsAll,
  taskTagId,
  updateTaskTag,
  deleteTaskTag,
} from "../controllers/task_tags.controllers.js";
import { body, validationResult } from "express-validator";
import {
  validationCreateTaskTag,
  validationDeleteTaskTag,
  validationGetIdTaskTag,
  validationUpdateTaskTag,
} from "../middlewares/validations/taskTagValidation.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const routerTaskTag = express.Router();
routerTaskTag.post(
  "/task_tags",
  validationCreateTaskTag,
  aplicarValidaciones,
  createTaskTag
);
routerTaskTag.get(
  "/task_tags/:id",
  validationGetIdTaskTag,
  aplicarValidaciones,
  taskTagId
);
routerTaskTag.get("/task_tags", taskTagsAll);
routerTaskTag.put(
  "/task_tags/:id",
  validationUpdateTaskTag,
  aplicarValidaciones,
  updateTaskTag
);
routerTaskTag.delete(
  "/task_tags/:id",
  validationDeleteTaskTag,
  aplicarValidaciones,
  deleteTaskTag
);
export default routerTaskTag;
