import { body } from "express-validator";
import { UserProfileModel } from "../../models/user_profile.model.js";
import { UserModel } from "../../models/user.model.js";

export const validationCreateProfile = [
  body("bio")
    .trim()
    .notEmpty()
    .withMessage("La biografia no puede estar vacía"),
  body("date_of_birth")
    .trim()
    .notEmpty()
    .withMessage("La fecha de cumpleaños no puede estar vacía"),
  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("El número de telefono no puede estar vacío"),
  body("user_id")
    .trim()
    .isInt()
    .withMessage("El id de user debe ser un entero")
    .custom(async (value) => {
      const perfilUnico = await UserProfileModel.findOne({
        where: { user_id: value },
      });
      if (perfilUnico) {
        throw new Error("Ya existe un perfil asociado al usuario");
      }

      // validar usuario existente

      const usuarioExistente = await UserModel.findByPk(user_id);
      if (usuarioExistente === null) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const validationUpdateProfile = [
  body("bio")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La biografia no puede estar vacía"),
  body("date_of_birth")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La fecha de cumpleaños no puede estar vacía"),
  body("phone_number")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El número de telefono no puede estar vacío"),
  body("user_id")
    .optional()
    .trim()
    .isInt()
    .withMessage("El id de user debe ser un entero")
    .custom(async (value) => {
      const perfilUnico = await UserProfileModel.findOne({
        where: { user_id: value },
      });
      if (perfilUnico) {
        throw new Error("Ya existe un perfil asociado al usuario");
      }

      // validar usuario existente

      const usuarioExistente = await UserModel.findByPk(user_id);
      if (usuarioExistente === null) {
        throw new Error("El usuario no existe");
      }
    }),
];
