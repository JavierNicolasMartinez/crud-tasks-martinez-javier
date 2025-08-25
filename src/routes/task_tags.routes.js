import express from "express";
import {
  createTaskTag,
  taskTagsAll,
  taskTagId,
} from "../controllers/task_tags.controllers.js";
import { body } from "express-validator";

const routerTaskTag = express.Router();
routerTaskTag.post("/task_tags", createTaskTag);
routerTaskTag.get("/task_tags/:id", taskTagId);
routerTaskTag.get("/task_tags", taskTagsAll);

export default routerTaskTag;
