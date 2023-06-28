import { Sequelize, DataTypes, QueryTypes } from "sequelize";

const sequelize = new Sequelize("usub", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize, DataTypes, QueryTypes };
