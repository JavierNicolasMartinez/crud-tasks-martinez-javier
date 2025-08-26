import { body } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

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
  body("name")
    .optional()
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
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía"),
];
