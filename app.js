import express from "express";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";
import routerTask from "./src/routes/task.routes.js";
import routerUser from "./src/routes/user.routes.js";
// import { TaskModel } from "./src/models/task.model.js";
// import { UserModel } from "./src/models/user.model.js";
// import { TagModel } from "./src/models/tag.model.js";
// import { UserProfileModel } from "./src/models/user_profile.model.js";
// import { TaskTagsModel } from "./src/models/task_tags.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api", routerTask);
app.use("/api", routerUser);

app.listen(PORT, async () => {
  await startDB();
  console.log("Servidor corriendo en el puerto: ", PORT);
});
