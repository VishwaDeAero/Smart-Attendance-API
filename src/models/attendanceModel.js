const { DataTypes } = require('sequelize');
const {DB} = require("../database/connect");

const Student = require('./studentModel');
const Subject = require('./subjectModel');
const Lecture = require('./lectureModel');

const Attendance = DB.define('attendance', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  StudentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  SubjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  LectureId: {
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

Attendance.belongsTo(Student, { foreignKey: 'StudentId' });
Attendance.belongsTo(Subject, { foreignKey: 'SubjectId' });
Attendance.belongsTo(Lecture, { foreignKey: 'LectureId' });

module.exports = Attendance;
