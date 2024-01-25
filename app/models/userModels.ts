import { sequelize, DataTypes } from "./index";

const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(75),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(11),
  },
});

export default user;
