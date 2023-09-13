const { DataTypes } = require('sequelize');
const {DB} = require("../database/connect");

const Subject = require('./subjectModel');

const Lecture = DB.define('lecture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scheduledAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.DECIMAL(2,2),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  tokenQR: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lecturer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
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

Lecture.belongsTo(Subject, { foreignKey: 'subjectId' });

module.exports = Lecture;
