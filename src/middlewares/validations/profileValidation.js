import { body, param } from "express-validator";
import { UserProfileModel } from "../../models/user_profile.model.js";
import { UserModel } from "../../models/user.model.js";
import { Op } from "sequelize";

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
    .withMessage("El número de telefono no puede estar vacío")
    .custom(async (value) => {
      const telefonoUnico = await UserProfileModel.findOne({
        where: { phone_number: value },
      });
      if (telefonoUnico)
        return res
          .status(400)
          .json({ message: "Ya existe ese número de teléfono" });
    }),
  body("user_id")
    .trim()
    .isInt()
    .withMessage("El id de user debe ser un entero")
    .custom(async (value) => {
      try {
        const perfilUnico = await UserProfileModel.findOne({
          where: { user_id: value },
        });
        if (perfilUnico) {
          return Promise.reject("Ya existe un perfil asociado al usuario");
        }
      } catch (error) {
        console.error("Error con el perfil.", error);
        return Promise.reject("Error al encontrar al perfil", error);
      }
      //   // validar usuario existente
      //   try {
      //     const usuarioExistente = await UserModel.findByPk(id);
      //     if (usuarioExistente === null) {
      //       return Promise.reject("El usuario no existe");
      //     }
      //   } catch (error) {
      //     console.error("Error con el perfil.", error);
      //     return Promise.reject("El usuario no existe", error);
      //   }
    })
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
  ,
];

export const validationUpdateProfile = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const PerfilExistente = await UserProfileModel.findByPk(id);
        if (!PerfilExistente) {
          return Promise.reject("El perfil no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia del perfil", error);
        return Promise.reject(
          "Ocurrio un error con la existencia del perfil",
          error
        );
      }
    }),
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
        id: { [Op.ne]: req.params.id },
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

export const validationGetIdProfile = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const PerfilExistente = await UserProfileModel.findByPk(id);
        if (!PerfilExistente) {
          return Promise.reject("El perfil no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia del perfil", error);
        return Promise.reject(
          "Ocurrio un error con la existencia del perfil",
          error
        );
      }
    }),
];

export const validationDeleteProfile = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const PerfilExistente = await UserProfileModel.findByPk(id);
        if (!PerfilExistente) {
          return Promise.reject("El perfil no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia del perfil", error);
        return Promise.reject(
          "Ocurrio un error con la existencia del perfil",
          error
        );
      }
    }),
];
