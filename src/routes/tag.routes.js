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
  validationDeleteTag,
  validationGetIdTag,
  validationUpdateTag,
} from "../middlewares/validations/tagValidation.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const routerTag = express.Router();
routerTag.post("/tags", validationCreateTag, aplicarValidaciones, createTag);
routerTag.get("/tags", tagsAll);
routerTag.get("/tags/:id", validationGetIdTag, aplicarValidaciones, tagsId);
routerTag.delete(
  "/tags/:id",
  validationDeleteTag,
  aplicarValidaciones,
  deleteTag
);
routerTag.put("/tags/:id", validationUpdateTag, aplicarValidaciones, updateTag);

export default routerTag;
