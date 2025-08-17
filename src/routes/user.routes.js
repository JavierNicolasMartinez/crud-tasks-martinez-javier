import express from "express";
import {
  createUser,
  usersAll,
  userId,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const routerUser = express.Router();
routerUser.post("/users", createUser);
routerUser.get("/users", usersAll);
routerUser.get("/users/:id", userId);
routerUser.put("/users/:id", updateUser);
routerUser.delete("/users/:id", deleteUser);

export default routerUser;

// ● POST /api/users: Crear un nuevo usuario.
// ● GET /api/users: Obtener todos los usuarios.
// ● GET /api/users/:id: Obtener un usuario específico por su ID.
// ● PUT /api/users/:id: Actualizar un usuario específico por su ID.
// ● DELETE /api/users/:id: Eliminar un usuario específico por su ID.
