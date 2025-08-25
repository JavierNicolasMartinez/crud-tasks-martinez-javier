import express from "express";
import {
  createUserProfile,
  profilesAll,
  perfilId,
  updateProfile,
  deleteProfile,
} from "../controllers/user_profile.controllers.js";
import { validationCreateProfile, validationUpdateProfile } from "../middlewares/validations/profileValidation.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const routerProfile = express.Router();
routerProfile.post("/profile", validationCreateProfile, aplicarValidaciones, createUserProfile);
routerProfile.get("/profile", profilesAll);
routerProfile.get("/profile/:id", perfilId);
routerProfile.put("/profile/:id", validationUpdateProfile, aplicarValidaciones,  updateProfile);
routerProfile.delete("/profile/:id", deleteProfile);

export default routerProfile;
