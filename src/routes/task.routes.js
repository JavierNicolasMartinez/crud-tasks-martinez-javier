import express from "express";
import {
  createTask,
  updateTask,
  tasksAll,
  tasksId,
  deleteTask,
} from "../controllers/task.controllers.js";

const routerTask = express.Router();
routerTask.post("/tasks", createTask);
routerTask.get("/tasks", tasksAll);
routerTask.get("/tasks/:id", tasksId);
routerTask.put("/tasks/:id", updateTask);
routerTask.delete("/tasks/:id", deleteTask);

export default routerTask;

// POST /api/tasks: Añadir una nueva tarea.
// ● GET /api/tasks: Obtener todas las tareas.
// ● GET /api/tasks/:id: Obtener una tarea específica por su ID.
// ● PUT /api/tasks/:id: Actualizar una tarea específica por su ID.
// ● DELETE /api/tasks/:id: Eliminar una tarea específica por su ID.
