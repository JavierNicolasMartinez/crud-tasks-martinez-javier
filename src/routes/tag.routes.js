import express from "express";
import { createTag, tagsAll, tagsId } from "../controllers/tag.controllers.js";

const routerTag = express.Router();
routerTag.post("/tags", createTag);
routerTag.get("/tags", tagsAll);
routerTag.get("/tags/:id", tagsId);

export default routerTag;
