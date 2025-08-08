import { TaskModel } from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description, isComplete } = req.body;
  try {
    const taskUnica = await TaskModel.findOne({ where: { title } });
    if (taskUnica !== null) {
      return res.status(400).json({
        Message: "El título ya existe.",
      });
    }
    if (title === undefined || title === "") {
      return res
        .status(400)
        .json({ Message: "El título no puede estar vacío" });
    }
    if (description === undefined || description === "") {
      return res
        .status(400)
        .json({ Message: "La descripción no puede estar vacío" });
    }

    if (typeof title !== "string") {
      return res.status(400).json({ Message: "El título debe ser una cadena" });
    }
    if (title.length > 100) {
      return res
        .status(400)
        .json({ Message: "El título no debe ser mayor a 100 caracteres." });
    }
    if (typeof description !== "string") {
      return res
        .status(400)
        .json({ Message: "La descripción debe ser una cadena" });
    }
    if (description.length > 100) {
      return res.status(400).json({
        Message: "La descripción no debe ser mayor a 100 caracteres.",
      });
    }
    if (typeof isComplete !== "boolean") {
      return res
        .status(400)
        .json({ Message: "IsComplete debe ser un booleano" });
    }

    const task = await TaskModel.create({
      title,
      description,
      isComplete,
    });

    res.status(201).json({ Message: "La pregunta fue creada con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
