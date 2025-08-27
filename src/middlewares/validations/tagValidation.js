import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";
import { Op } from "sequelize";

export const validationCreateTag = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .custom(async (value) => {
      const tagUnica = await TagModel.findOne({ where: { name: value } });
      if (tagUnica !== null) {
        throw new Error("Nombre ya existente");
      }
    }),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía"),
];

export const validationUpdateTag = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const EtiquetaExistente = await TagModel.findByPk(id);
        if (!EtiquetaExistente) {
          return Promise.reject("La etiqueta no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
      }
    }),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .custom(async (value) => {
      const tagUnica = await TagModel.findOne({
        name: value,
        id: { [Op.ne]: req.params.id },
      });
      if (tagUnica !== null) {
        throw new Error("Nombre ya existente");
      }
    }),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía"),
];

export const validationGetIdTag = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const EtiquetaExistente = await TagModel.findByPk(id);
        if (!EtiquetaExistente) {
          return Promise.reject("La etiqueta no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
      }
    }),
];

export const validationDeleteTag = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const EtiquetaExistente = await TagModel.findByPk(id);
        if (!EtiquetaExistente) {
          return Promise.reject("La etiqueta no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
      }
    }),
];
