import express from "express";
import {
  createUserProfile,
  profilesAll,
  perfilId,
} from "../controllers/user_profile.controllers.js";

const routerProfile = express.Router();
routerProfile.post("/profile", createUserProfile);
routerProfile.get("/profile", profilesAll);
routerProfile.get("/profile/:id", perfilId);

export default routerProfile;
