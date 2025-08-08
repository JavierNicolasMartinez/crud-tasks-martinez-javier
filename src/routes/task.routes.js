import express from "express";

const routerTask = express.Router();
router.post("/tasks", createTask);
// router.get("/tasks", tasksAll);
// router.get("/tasks/:id", taskId);
// router.put("/tasks/:id", updateTask);
// router.delete("/tasks/:id", deleteTask);

export default routerTask;

// POST /api/tasks: Añadir una nueva tarea.
// ● GET /api/tasks: Obtener todas las tareas.
// ● GET /api/tasks/:id: Obtener una tarea específica por su ID.
// ● PUT /api/tasks/:id: Actualizar una tarea específica por su ID.
// ● DELETE /api/tasks/:id: Eliminar una tarea específica por su ID.
