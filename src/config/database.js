import Sequelize  from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

export const startDB = async () => {
try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('Se ha establecido con exito la conexión a la base de datos');
} catch (error) {
  console.error('Ocurrio un error con la conexion de la base de datos:', error);
}
};