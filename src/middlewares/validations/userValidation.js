import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { Op } from "sequelize";

export const validationCreateUser = [
  body("email")
    .trim() //quita espacios
    .notEmpty() //campo obligatorio
    .withMessage("El email no puede estar vacío")
    .isEmail() //verifica que sea un email
    .withMessage("Debe ser un email valido")
    .isLength({ max: 100 }) //Da un maximo o un minimo de caracteres
    .withMessage("El email no debe ser mayor a 100 caracteres")
    .isString() //Verifica que sea un string
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
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
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
      const userUnico = await UserModel.findOne({
        email: value,
        id: { [Op.ne]: req.params.id },
      });
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

export const validationGetIdUser = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
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
];

//Forma del profe
// param("id")
//   .isInt()
//   .withMessage("...")
//   .custom(async (value) => {
//     const person = await PersonModel.findByPk(value);
//     if (!person) {
//       throw new Error("...");
//     }
//   });

export const validationDeleteUser = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
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
]