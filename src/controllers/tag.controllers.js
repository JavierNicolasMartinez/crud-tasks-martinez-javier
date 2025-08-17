import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (name === undefined || name === "") {
      return res
        .status(400)
        .json({ Message: "El nombre de la etiqueta no puede estar vacío" });
    }
    if (description === undefined || description === "") {
      return res
        .status(400)
        .json({ Message: "La descripción no puede estar vacío" });
    }

    const tagUnica = await TagModel.findOne({ where: { name } });
    if (tagUnica !== null) {
      return res.status(400).json({
        Message: "La etiqueta ya existe",
      });
    }
    const tag = await TagModel.create({
      name,
      description,
    });

    res.status(201).json({ Message: "La etiqueta fue creada con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export const tagsAll = async (req, res) => {
  try {
    const etiquetas = await TagModel.findAll();
    if (etiquetas.length === 0) {
      return res
        .status(404)
        .json({ Message: "No hay ninguna etiqueta en la base de datos" });
    }
    return res.status(200).json(etiquetas);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const tagsId = async (req, res) => {
  try {
    const etiqueta = await TagModel.findByPk(req.params.id);
    if (etiqueta) {
      return res.status(200).json(etiqueta);
    }
    return res.status(404).json({ Message: "La etiqueta no fue encontrada" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
