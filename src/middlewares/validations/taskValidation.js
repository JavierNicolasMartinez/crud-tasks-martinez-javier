import { body, param } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { UserModel } from "../../models/user.model.js";
import { Op } from "sequelize";

export const validationCreateTask = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isString()
    .withMessage("El título debe ser un string")
    .isLength({ max: 100 })
    .withMessage("El título no debe superar los 100 catacteres")
    .custom(async (value) => {
      const taskUnica = await TaskModel.findOne({ where: { title: value } });
      if (taskUnica !== null) {
        throw new Error("El título ya existe.");
      }
    }),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isString()
    .withMessage("La descripción tiene que ser string")
    .isLength()
    .withMessage("La descripción no debe superar los 100 caracteres"),

  body("isComplete")
    .trim()
    .isBoolean()
    .withMessage("isComplete debe ser booleano"),

  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("Debe tener un usuario asignado a través del id")
    .isInt()
    .withMessage("El id debe ser un entero")
    .custom(async (id) => {
      try {
        const usuarioExistente = await UserModel.findByPk(id);
        if (!usuarioExistente) {
          return Promise.reject("El usuario no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia del Usuario", error);
        return Promise.reject(
          "Ocurrio un error con la existencia del usuario",
          error
        );
      }
    }),
  // .custom(async (value) => {
  //   const usuario = await UserModel.findByPk(user_id);
  //   if (!usuario) {
  //     throw new Error("El usuario no existe");
  //   }
  // }),
];

export const validationUpdateTask = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const TareaExistente = await TaskModel.findByPk(id);
        if (!TareaExistente) {
          return Promise.reject("La tarea no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia de la tarea", error);
        return Promise.reject(
          "Ocurrio un error con la existencia de la tarea",
          error
        );
      }
    }),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isString()
    .withMessage("El título debe ser un string")
    .isLength({ max: 100 })
    .withMessage("El título no debe superar los 100 catacteres")
    .custom(async (value) => {
      const taskUnica = await TaskModel.findOne({
        title: value,
        id: { [Op.ne]: req.params.id },
      });
      if (taskUnica !== null) {
        throw new Error("El título ya existe.");
      }
    }),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isString()
    .withMessage("La descripción tiene que ser string")
    .isLength()
    .withMessage("La descripción no debe superar los 100 caracteres"),

  body("isComplete")
    .optional()
    .trim()
    .isBoolean()
    .withMessage("isComplete debe ser booleano"),

  body("user_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Debe tener un usuario asignado a través del id")
    .isInt()
    .withMessage("El id debe ser un entero")
    .custom(async (value) => {
      const usuario = await UserModel.findByPk(user_id);
      if (!usuario) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const validationGetIdTask = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const TareaExistente = await TaskModel.findByPk(id);
        if (!TareaExistente) {
          return Promise.reject("La tarea no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia de la tarea", error);
        return Promise.reject(
          "Ocurrio un error con la existencia de la tarea",
          error
        );
      }
    }),
];

export const validationDeleteTask = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const TareaExistente = await TaskModel.findByPk(id);
        if (!TareaExistente) {
          return Promise.reject("La tarea no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia de la tarea", error);
        return Promise.reject(
          "Ocurrio un error con la existencia de la tarea",
          error
        );
      }
    }),
];
