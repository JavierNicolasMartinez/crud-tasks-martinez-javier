import { body } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { TaskTagsModel } from "../../models/task_tags.model.js";
import { TagModel } from "../../models/tag.model.js";

export const validationCreateTaskTag = [
  body("task_id")
    .trim()
    .notEmpty()
    .withMessage("El id de tareas no puede estar vacio")
    .isInt()
    .withMessage("El id de task debe ser un entero")
    .custom(async (value) => {
      const taskExiste = await TaskModel.findByPk({ task_id: value });
      if (taskExiste === null) {
        throw new Error("La tarea no existe");
      }
    }),

  body("tag_id")
    .trim()
    .notEmpty()
    .withMessage("El id de etiqueta no puede estar vacío")
    .isInt()
    .withMessage("El id de etiqueta debe ser un entero")
    .custom(async (value) => {
      const tagExiste = await TagModel.findByPk({ tag_id: value });
      if (tagExiste === null) {
        throw new Error("La etiqueta no existe");
      }
    }),
];

export const validationUpdateTaskTag = [
  body("task_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El id de tareas no puede estar vacio")
    .isInt()
    .withMessage("El id de task debe ser un entero")
    .custom(async (value) => {
      const taskExiste = await TaskModel.findByPk({ task_id: value });
      if (taskExiste === null) {
        throw new Error("La tarea no existe");
      }
    }),

  body("tag_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El id de etiqueta no puede estar vacío")
    .isInt()
    .withMessage("El id de etiqueta debe ser un entero")
    .custom(async (value) => {
      const tagExiste = await TagModel.findByPk({ tag_id: value });
      if (tagExiste === null) {
        throw new Error("La etiqueta no existe");
      }
    }),
];
