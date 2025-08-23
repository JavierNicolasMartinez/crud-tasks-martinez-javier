import { UserProfileModel } from "../models/user_profile.model.js";
import { UserModel } from "../models/user.model.js";
import { Op } from "sequelize";

export const createUserProfile = async (req, res) => {
  const { bio, date_of_birth, phone_number, user_id } = req.body;
  try {
    if (bio === undefined || bio === "") {
      return res
        .status(400)
        .json({ Message: "La biografia no puede estar vacía" });
    }
    if (date_of_birth === undefined || date_of_birth === "") {
      return res
        .status(400)
        .json({ Message: "El cumpleaños no puede estar vacío" });
    }
    if (phone_number === undefined || phone_number === "") {
      return res
        .status(400)
        .json({ Message: "El telefono no puede estar vacío" });
    }

    if (!user_id || !Number.isInteger(user_id))
      return res
        .status(400)
        .json({ message: "Es necesario asignar un usuario al perfil" });

    const usuarioExistente = await UserModel.findByPk(user_id);
    if (usuarioExistente === null) {
      return res.status(400).json({
        message: "El usuario no existe",
      });
    }
    const perfilUnico = await UserProfileModel.findOne({ where: { user_id } });
    if (perfilUnico !== null) {
      return res.status(400).json({
        Message: "Este usuario ya contiene un perfil asociado",
      });
    }

    const profile = await UserProfileModel.create({
      bio,
      date_of_birth,
      phone_number,
      user_id,
    });

    res
      .status(201)
      .json({ Message: "El perfil del usuario fue creado con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export const profilesAll = async (req, res) => {
  try {
    const perfiles = await UserProfileModel.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: UserModel,
          attributes: { exclude: ["password"] },
          as: "user",
        },
      ],
    });
    if (perfiles.length === 0) {
      return res
        .status(404)
        .json({ Message: "No hay ningun perfil en la base de datos" });
    }
    return res.status(200).json(perfiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const perfilId = async (req, res) => {
  try {
    const perfil = await UserProfileModel.findByPk(req.params.id, {
      attributes: { exclude: ["user_id"] },
      include: [
        {
          model: UserModel,
          attributes: { exclude: ["password"] },
          as: "user",
        },
      ],
    });
    if (perfil) {
      return res.status(200).json(perfil);
    }
    return res.status(404).json({ Message: "El perfil no fue encontrado" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

//Agregados de update y delete.

export const updateProfile = async (req, res) => {
  const { bio, date_of_birth, phone_number, user_id } = req.body;
  try {
    if (!user_id || !Number.isInteger(user_id))
      return res
        .status(400)
        .json({ message: "Es necesario asignar un usuario al perfil" });

    if (bio) {
      if (bio === undefined || bio === "") {
        return res
          .status(400)
          .json({ Message: "La biografia no puede estar vacía" });
      }
    }
    if (date_of_birth) {
      if (date_of_birth === undefined || date_of_birth === "") {
        return res
          .status(400)
          .json({ Message: "El cumpleaños no puede estar vacío" });
      }
    }
    if (phone_number) {
      if (phone_number === undefined || phone_number === "") {
        return res
          .status(400)
          .json({ Message: "El número de telefono no puede estar vacío" });
      }
    }

    const perfilExistente = await UserProfileModel.findByPk(user_id);
    if (perfilExistente === null) {
      return res.status(400).json({
        message: "El perfil no existe",
      });
    }
    const telefonoUnico = await UserProfileModel.findOne({
      where: { phone_number: phone_number, id: { [Op.ne]: req.params.id } },
    });
    if (telefonoUnico)
      return res
        .status(400)
        .json({ message: "Ya existe ese número de teléfono" });

    const [updated] = await UserProfileModel.update(
      { bio, date_of_birth, phone_number, user_id },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ Message: "El perfil no existe" });
    }
    res.status(200).json({ Message: "Se actualizo un perfil" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const deleted = await UserProfileModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted === 0)
      return res.status(404).json({ Message: "El perfil no fue encontrado" });
    res.status(200).json({ Message: "perfil eliminado." });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
