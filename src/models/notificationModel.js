const { DataTypes } = require('sequelize');
const {DB} = require("../database/connect");

const Notification = DB.define('notifications', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  viewedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = Notification;
