import express from "express";


const routerUser = express.Router()
router.post("/users", createUser);
// router.get("/users", usersAll);
// router.get("/users/:id", userId);
// router.put("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

export default routerUser;

// ● POST /api/users: Crear un nuevo usuario.
// ● GET /api/users: Obtener todos los usuarios.
// ● GET /api/users/:id: Obtener un usuario específico por su ID.
// ● PUT /api/users/:id: Actualizar un usuario específico por su ID.
// ● DELETE /api/users/:id: Eliminar un usuario específico por su ID.