import { Op } from "sequelize";
import { UserModel } from "../models/user.model.js";
import { UserProfileModel } from "../models/user_profile.model.js";
import { TaskModel } from "../models/task.model.js";

export const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (email === undefined || email === "") {
      return res.status(400).json({ Message: "El email no puede estar vacío" });
    }
    if (name === undefined || name === "") {
      return res
        .status(400)
        .json({ Message: "El nombre no puede estar vacío" });
    }
    if (password === undefined || password === "") {
      return res
        .status(400)
        .json({ Message: "El password no puede estar vacío" });
    }

    if (typeof email !== "string") {
      return res.status(400).json({ Message: "El email debe ser una cadena" });
    }
    if (email.length > 100) {
      return res
        .status(400)
        .json({ Message: "El email no debe ser mayor a 100 caracteres." });
    }
    if (typeof name !== "string") {
      return res.status(400).json({ Message: "El nombre debe ser una cadena" });
    }
    if (name.length > 100) {
      return res.status(400).json({
        Message: "El nombre no debe ser mayor a 100 caracteres.",
      });
    }
    if (typeof password !== "string") {
      return res
        .status(400)
        .json({ Message: "La contraseña debe ser una cadena" });
    }
    if (password.length > 100) {
      return res.status(400).json({
        Message: "La contraseña no debe ser mayor a 100 caracteres.",
      });
    }
    const userUnico = await UserModel.findOne({ where: { email } });
    if (userUnico !== null) {
      return res.status(400).json({
        Message: "El email ya existe.",
      });
    }
    const user = await UserModel.create({
      email,
      name,
      password,
    });

    res.status(201).json({ Message: "El usuario fue creado con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (email) {
      if (email === undefined || email === "") {
        return res
          .status(400)
          .json({ Message: "El email no puede estar vacío" });
      }
    }
    if (name) {
      if (name === undefined || name === "") {
        return res
          .status(400)
          .json({ Message: "El nombre no puede estar vacío" });
      }
    }
    if (password) {
      if (password === undefined || password === "") {
        return res
          .status(400)
          .json({ Message: "La contraseña no puede estar vacía" });
      }
    }
    if (email) {
      if (typeof email !== "string") {
        return res
          .status(400)
          .json({ Message: "El email debe ser una cadena" });
      }
      if (email.length > 100) {
        return res
          .status(400)
          .json({ Message: "El email no debe ser mayor a 100 caracteres." });
      }
    }
    if (name) {
      if (typeof name !== "string") {
        return res
          .status(400)
          .json({ Message: "El nombre debe ser una cadena" });
      }
      if (name.length > 100) {
        return res.status(400).json({
          Message: "El nombre no debe ser mayor a 100 caracteres.",
        });
      }
    }
    if (password) {
      if (typeof password !== "string") {
        return res
          .status(400)
          .json({ Message: "La contraseña debe ser una cadena" });
      }
      if (password.length > 100) {
        return res.status(400).json({
          Message: "La constraseña no debe ser mayor a 100 caracteres.",
        });
      }
    }
    if (email) {
      const userUnico = await UserModel.findOne({
        where: { email: email, id: { [Op.ne]: req.params.id } },
      });
      if (userUnico !== null) {
        return res.status(400).json({
          Message: "El email ya existe.",
        });
      }
    }

    const [updated] = await UserModel.update(
      { email, name, password },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ Message: "El Usuario no existe" });
    }
    res.status(200).json({ Message: "Se actualizo un Usuario" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const usersAll = async (req, res) => {
  try {
    const usuarios = await UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          attributes: { exclude: ["id", "user_id"] },
        },
        {
          model: UserProfileModel,
          attributes: { exclude: ["user_id", "id"] },
        },
      ],
    });
    if (usuarios.length === 0) {
      return res
        .status(404)
        .json({ Message: "No hay ningun usuario en la base de datos" });
    }
    return res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const userId = async (req, res) => {
  try {
    const usuario = await UserModel.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          attributes: { exclude: ["user_id", "id"] },
        },
        {
          model: UserProfileModel,
          attributes: { exclude: ["id", "user_id"] },
        },
      ],
    });
    if (usuario) {
      return res.status(200).json(usuario);
    }
    return res.status(404).json({ Message: "El usuario no fue encontrado" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.destroy({ where: { id: req.params.id } });
    if (deleted === 0)
      return res.status(404).json({ Message: "El Usuario no fue encontrado" });
    res.status(200).json({ Message: "Usuario eliminado." });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
