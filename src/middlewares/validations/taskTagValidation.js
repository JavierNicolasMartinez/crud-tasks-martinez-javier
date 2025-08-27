import { body, param } from "express-validator";
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
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const taskTagExistente = await TaskTagsModel.findByPk(id);
        if (!taskTagExistente) {
          return Promise.reject("La relación entre tarea y etiqueta no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la relación de tarea y etiqueta",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la relación de tarea y etiqueta",
          error
        );
      }
    }),
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

export const validationGetIdTaskTag = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const taskTagExistente = await TaskTagsModel.findByPk(id);
        if (!taskTagExistente) {
          return Promise.reject("La relación entre tarea y etiqueta no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la relación de tarea y etiqueta",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la relación de tarea y etiqueta",
          error
        );
      }
    }),
];

export const validationDeleteTaskTag = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const taskTagExistente = await TaskTagsModel.findByPk(id);
        if (!taskTagExistente) {
          return Promise.reject("La relación entre tarea y etiqueta no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la relación de tarea y etiqueta",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la relación de tarea y etiqueta",
          error
        );
      }
    }),
];
