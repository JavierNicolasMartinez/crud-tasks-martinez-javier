import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";
import { TaskTagsModel } from "../models/task_tags.model.js";

export const createTaskTag = async (req, res) => {
  const { task_id, tag_id } = req.body;
  try {
    if (task_id === undefined || task_id === "") {
      return res
        .status(400)
        .json({ Message: "El id de tareas no puede estar vacío" });
    }
    if (tag_id === undefined || tag_id === "") {
      return res
        .status(400)
        .json({ Message: "El id de etiquetas no puede estar vacío" });
    }

    if (Number.isInteger(task_id) === "false") {
      return res
        .status(400)
        .json({ Message: "El id de Tareas debe ser un entero" });
    }
    if (Number.isInteger(tag_id) === "false") {
      return res
        .status(400)
        .json({ Message: "El id de Tareas debe ser un entero" });
    }

    const taskExiste = await TaskModel.findByPk(task_id);
    if (taskExiste === null) {
      return res.status(400).json({
        message: "La tarea no existe",
      });
    }
    const tagExiste = await TagModel.findByPk(tag_id);
    if (tagExiste === null) {
      return res.status(400).json({
        message: "La etiqueta no existe",
      });
    }

    const relacionTaskTag = TaskTagsModel.create({
      task_id,
      tag_id,
    });
    res.status(201).json({
      Message: "La relación entre Tareas y etiquetas fue creada con exito.",
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export const taskTagsAll = async (req, res) => {
  try {
    const relacionesTaskTagAll = await TaskTagsModel.findAll({
      include: [
        { model: TaskModel, as: "tasks" },
        { model: TagModel, as: "tags" },
      ],
    });
    if (relacionesTaskTagAll.length === 0) {
      return res.status(404).json({
        Message: "No hay ninguna relación entre task y tag en la base de datos",
      });
    }
    return res.status(200).json(relacionesTaskTagAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const taskTagId = async (req, res) => {
  try {
    const relacionTaskTag = await TaskTagsModel.findByPk(req.params.id, {
      include: [
        {
          model: TagModel,
          as: "tags",
        },
        { model: TaskModel, as: "tasks" },
      ],
    });
    if (relacionTaskTag) {
      return res.status(200).json(relacionTaskTag);
    }
    return res.status(404).json({ Message: "La relacion no fue encontrada" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
