require('dotenv').config();
const Sequelize = require('sequelize');
const user = process.env.DB_USER;
const password = process.env.DB_PASS;

const connection = new Sequelize(`postgres://${user}:${password}@lallah.db.elephantsql.com/${user}`);

module.exports = connection;
