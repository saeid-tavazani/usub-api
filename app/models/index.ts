import { Sequelize, DataTypes } from "sequelize";
import userModels from "./userModels";

const sequelize = new Sequelize("usub", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize, DataTypes };
