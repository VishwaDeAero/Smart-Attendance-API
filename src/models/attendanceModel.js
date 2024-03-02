const { DataTypes } = require('sequelize');
const {DB} = require("../database/connect");

const Student = require('./studentModel');
const Subject = require('./subjectModel');
const Lecture = require('./lectureModel');

const Attendance = DB.define('attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lectureId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deviceData: {
    type: DataTypes.TEXT,
  },
  attendedAt: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Attendance.belongsTo(Student, { foreignKey: 'studentId' });
Attendance.belongsTo(Lecture, { foreignKey: 'lectureId' });

module.exports = Attendance;
