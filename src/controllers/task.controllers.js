import { Op } from "sequelize";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { TaskTagsModel } from "../models/task_tags.model.js";
import { TagModel } from "../models/tag.model.js";

export const createTask = async (req, res) => {
  const { title, description, isComplete, user_id } = req.body;
  try {
    // if (!user_id || !Number.isInteger(user_id))
    //   return res
    //     .status(400)
    //     .json({ message: "Es necesario asignar un usuario a la tarea" });

    // const usuario = await UserModel.findByPk(user_id);
    // if (!usuario) {
    //   return res.status(404).json({
    //     message: "El usuario no existe",
    //   });
    // }

    // if (title === undefined || title === "") {
    //   return res
    //     .status(400)
    //     .json({ Message: "El título no puede estar vacío" });
    // }
    // if (description === undefined || description === "") {
    //   return res
    //     .status(400)
    //     .json({ Message: "La descripción no puede estar vacío" });
    // }

    // if (typeof title !== "string") {
    //   return res.status(400).json({ Message: "El título debe ser una cadena" });
    // }
    // if (title.length > 100) {
    //   return res
    //     .status(400)
    //     .json({ Message: "El título no debe ser mayor a 100 caracteres." });
    // }
    // if (typeof description !== "string") {
    //   return res
    //     .status(400)
    //     .json({ Message: "La descripción debe ser una cadena" });
    // }
    // if (description.length > 100) {
    //   return res.status(400).json({
    //     Message: "La descripción no debe ser mayor a 100 caracteres.",
    //   });
    // }
    // if (typeof isComplete !== "boolean") {
    //   return res
    //     .status(400)
    //     .json({ Message: "IsComplete debe ser un booleano" });
    // }
    // const taskUnica = await TaskModel.findOne({ where: { title } });
    // if (taskUnica !== null) {
    //   return res.status(400).json({
    //     Message: "El título ya existe.",
    //   });
    // }
    const task = await TaskModel.create({
      title,
      description,
      isComplete,
      user_id,
    });

    res.status(201).json({ Message: "La tarea fue creada con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, isComplete, user_id } = req.body;
  try {
    //Recordar primero ver existencia.
    // if (!user_id || !Number.isInteger(user_id))
    //   return res
    //     .status(400)
    //     .json({ message: "Es necesario asignar un usuario a la tarea" });

    // const usuario = await UserModel.findByPk(user_id);
    // if (!usuario) {
    //   return res.status(404).json({
    //     message: "El usuario no existe",
    //   });
    // }
    // if (title) {
    //   if (title === undefined || title === "") {
    //     return res
    //       .status(400)
    //       .json({ Message: "El título no puede estar vacío" });
    //   }
    // }
    // if (description) {
    //   if (description === undefined || description === "") {
    //     return res
    //       .status(400)
    //       .json({ Message: "La descripción no puede estar vacío" });
    //   }
    // }
    // if (title) {
    //   if (typeof title !== "string") {
    //     return res
    //       .status(400)
    //       .json({ Message: "El título debe ser una cadena" });
    //   }
    //   if (title.length > 100) {
    //     return res
    //       .status(400)
    //       .json({ Message: "El título no debe ser mayor a 100 caracteres." });
    //   }
    // }
    // if (description) {
    //   if (typeof description !== "string") {
    //     return res
    //       .status(400)
    //       .json({ Message: "La descripción debe ser una cadena" });
    //   }
    //   if (description.length > 100) {
    //     return res.status(400).json({
    //       Message: "La descripción no debe ser mayor a 100 caracteres.",
    //     });
    //   }
    // }
    // if (isComplete) {
    //   if (typeof isComplete !== "boolean") {
    //     return res
    //       .status(400)
    //       .json({ Message: "IsComplete debe ser un booleano" });
    //   }
    // }
    // if (title) {
    //   const taskUnica = await TaskModel.findOne({
    //     where: { title, id: { [Op.ne]: req.params.id } },
    //   });
    //   if (taskUnica !== null) {
    //     return res.status(400).json({
    //       Message: "El título ya existe.",
    //     });
    //   }
    // }

    const [updated] = await TaskModel.update(
      { title, description, isComplete, user_id },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ Message: "La tarea no existe" });
    }
    res.status(200).json({ Message: "Se actualizo una tarea" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const tasksAll = async (req, res) => {
  try {
    const tareas = await TaskModel.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: UserModel,
          attributes: { exclude: ["password"] },
          as: "user",
        },
        {
          model: TagModel,
          // attributes: { include: ["name"] },
          as: "tags",
        },
      ],
    });
    if (tareas.length === 0) {
      return res
        .status(404)
        .json({ Message: "No hay ninguna tarea en la base de datos" });
    }
    return res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const tasksId = async (req, res) => {
  try {
    const tarea = await TaskModel.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: UserModel,
          attributes: { exclude: ["password"] },
          as: "user",
        },
        // {
        // model: TaskTagsModel,
        // attributes: ["id"],
        // include: [
        { model: TagModel, attributes: ["name"], as: "tags" },

        // ],
        // },
      ],
    });
    if (tarea) {
      return res.status(200).json(tarea);
    }
    return res.status(404).json({ Message: "La tarea no fue encontrada" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await TaskModel.destroy({ where: { id: req.params.id } });
    if (deleted === 0)
      return res.status(404).json({ Message: "La tarea no fue encontrada" });
    res.status(200).json({ Message: "Tarea eliminada." });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
