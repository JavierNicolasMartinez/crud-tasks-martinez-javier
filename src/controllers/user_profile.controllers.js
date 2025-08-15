import { UserProfileModel } from "../models/user_profile.model";
import { UserModel } from "../models/user.model";

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
    if (usuarioExistente !== null) {
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
