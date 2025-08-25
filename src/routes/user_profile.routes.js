import express from "express";
import {
  createUserProfile,
  profilesAll,
  perfilId,
  updateProfile,
  deleteProfile,
} from "../controllers/user_profile.controllers.js";
import { body } from "express-validator";

const routerProfile = express.Router();
routerProfile.post("/profile", createUserProfile);
routerProfile.get("/profile", profilesAll);
routerProfile.get("/profile/:id", perfilId);
routerProfile.put("/profile/:id", updateProfile);
routerProfile.delete("/profile/:id", deleteProfile);

export default routerProfile;
