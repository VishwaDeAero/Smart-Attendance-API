const { DataTypes } = require('sequelize');
const {DB} = require("../database/connect");

const Subject = require('./subjectModel');

const Lecture = DB.define('lecture', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  SubjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  DateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Duration: {
    type: DataTypes.DECIMAL(2,2),
    allowNull: false,
  },
  Location: {
    type: DataTypes.STRING,
  },
  QRtoken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Lecturer: {
    type: DataTypes.STRING,
    allowNull: false,
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

Lecture.belongsTo(Subject, { foreignKey: 'SubjectId' });

module.exports = Lecture;
