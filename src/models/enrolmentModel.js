const { DataTypes } = require('sequelize');
const {DB} = require("../database/connect");

const Student = require('./studentModel');
const Subject = require('./subjectModel');

const Enrolment = DB.define('enrolment', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

Enrolment.belongsTo(Student, { foreignKey: 'studentId' });
Enrolment.belongsTo(Subject, { foreignKey: 'subjectId' });

module.exports = Enrolment;
