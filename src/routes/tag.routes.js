import express from "express";
import {
  createTag,
  tagsAll,
  tagsId,
  deleteTag,
  updateTag,
} from "../controllers/tag.controllers.js";
import { body, validationResult } from "express-validator";
import {
  validationCreateTag,
  validationUpdateTag,
} from "../middlewares/validations/tagValidation.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const routerTag = express.Router();
routerTag.post("/tags", validationCreateTag, aplicarValidaciones, createTag);
routerTag.get("/tags", tagsAll);
routerTag.get("/tags/:id", tagsId);
routerTag.delete("/tags/:id", deleteTag);
routerTag.put("/tags/:id", validationUpdateTag, aplicarValidaciones, updateTag);

export default routerTag;
