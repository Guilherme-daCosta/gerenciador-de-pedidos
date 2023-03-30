require('dotenv').config();
const Sequelize = require('sequelize');
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;

const connection = new Sequelize('order_manager', user, password, {
  host,
  dialect: 'mysql',
  timezone: '-03:00',
  port: 80
});

module.exports = connection;
