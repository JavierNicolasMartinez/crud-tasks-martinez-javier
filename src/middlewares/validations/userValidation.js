import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const validationCreateUser = [
  body("emaill")
    .trim()
    .notEmpty()
    .withMessage("El email no puede estar vacío")
    .isEmail()
    .withMessage("Debe ser un email valido")
    .isLength({ max: 100 })
    .withMessage("El email no debe ser mayor a 100 caracteres")
    .isString()
    .withMessage("El email debe ser un string")
    .custom(async (value) => {
      const userUnico = await UserModel.findOne({ where: { email: value } });
      if (userUnico) {
        throw new Error("El email ya existe");
        //   return res.status(400).json({
        //     Message: "El email ya existe.",
        //   });
      }
    }),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no debe estar vacío")
    .isLength({ max: 100 })
    .withMessage("El nombre no debe superar los 100 caracteres.")
    .isString()
    .withMessage("El nombre debe ser un string"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacío")
    .isLength({ max: 100 })
    .withMessage("La contraseña no debe superar los 100 caracteres.")
    .isString()
    .withMessage("La contraseña debe ser un string"),
];

export const validationUpdateUser = [
  body("emaill")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email no puede estar vacío")
    .isEmail()
    .withMessage("Debe ser un email valido")
    .isLength({ max: 100 })
    .withMessage("El email no debe ser mayor a 100 caracteres")
    .isString()
    .withMessage("El email debe ser un string")
    .custom(async (value) => {
      const userUnico = await UserModel.findOne({ where: { email: value } });
      if (userUnico) {
        throw new Error("El email ya existe");
        //   return res.status(400).json({
        //     Message: "El email ya existe.",
        //   });
      }
    }),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no debe estar vacío")
    .isLength({ max: 100 })
    .withMessage("El nombre no debe superar los 100 caracteres.")
    .isString()
    .withMessage("El nombre debe ser un string"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacío")
    .isLength({ max: 100 })
    .withMessage("La contraseña no debe superar los 100 caracteres.")
    .isString()
    .withMessage("La contraseña debe ser un string"),
];
