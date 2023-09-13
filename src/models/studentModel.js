const DataTypes = require("sequelize");
const {DB} = require("../database/connect");

const Student = DB.define('student', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IndexNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FaceIdToken: {
      type: DataTypes.STRING,
    },
    Status: {
      type: DataTypes.SMALLINT,
      defaultValue: 1
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });
  
  module.exports = Student;