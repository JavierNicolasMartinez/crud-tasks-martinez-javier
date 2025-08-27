import express from "express";
import {
  validationCreateUser,
  validationDeleteUser,
  validationGetIdUser,
  validationUpdateUser,
} from "../middlewares/validations/userValidation.js";
import {
  createUser,
  usersAll,
  userId,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const routerUser = express.Router();
routerUser.post(
  "/users",
  validationCreateUser,
  aplicarValidaciones,
  createUser
);
routerUser.get("/users", usersAll);
routerUser.get("/users/:id", validationGetIdUser, aplicarValidaciones, userId);
routerUser.put(
  "/users/:id",
  validationUpdateUser,
  aplicarValidaciones,
  updateUser
);
routerUser.delete(
  "/users/:id",
  validationDeleteUser,
  aplicarValidaciones,
  deleteUser
);

export default routerUser;

// ● POST /api/users: Crear un nuevo usuario.
// ● GET /api/users: Obtener todos los usuarios.
// ● GET /api/users/:id: Obtener un usuario específico por su ID.
// ● PUT /api/users/:id: Actualizar un usuario específico por su ID.
// ● DELETE /api/users/:id: Eliminar un usuario específico por su ID.
