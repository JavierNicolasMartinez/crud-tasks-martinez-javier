import express from "express";
import {
  createTag,
  tagsAll,
  tagsId,
  deleteTag,
  updateTag,
} from "../controllers/tag.controllers.js";

const routerTag = express.Router();
routerTag.post("/tags", createTag);
routerTag.get("/tags", tagsAll);
routerTag.get("/tags/:id", tagsId);
routerTag.delete("/tags/:id", deleteTag);
routerTag.put("/tags/:id", updateTag);

export default routerTag;
