import express from "express";
import {
  createTask,
  updateTask,
  tasksAll,
  tasksId,
  deleteTask,
} from "../controllers/task.controllers.js";
import {
  validationCreateTask,
  validationDeleteTask,
  validationGetIdTask,
  validationUpdateTask,
} from "../middlewares/validations/taskValidation.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
// import { body, validationResult } from "express-validator";
const routerTask = express.Router();
routerTask.post(
  "/tasks",
  validationCreateTask,
  aplicarValidaciones,
  createTask
);
routerTask.get("/tasks", tasksAll);
routerTask.get("/tasks/:id", validationGetIdTask, aplicarValidaciones, tasksId);
routerTask.put(
  "/tasks/:id",
  validationUpdateTask,
  aplicarValidaciones,
  updateTask
);
routerTask.delete(
  "/tasks/:id",
  validationDeleteTask,
  aplicarValidaciones,
  deleteTask
);

export default routerTask;

// POST /api/tasks: Añadir una nueva tarea.
// ● GET /api/tasks: Obtener todas las tareas.
// ● GET /api/tasks/:id: Obtener una tarea específica por su ID.
// ● PUT /api/tasks/:id: Actualizar una tarea específica por su ID.
// ● DELETE /api/tasks/:id: Eliminar una tarea específica por su ID.
