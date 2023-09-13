const Sequelize = require("sequelize");

// Establish Database Connection using Sequelize ORM
const DB = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql'
    }
  );

module.exports = {
    DB,
}