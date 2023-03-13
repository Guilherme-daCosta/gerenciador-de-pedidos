const Sequelize = require('sequelize');
const connection = require('../database');

const Restaurant = connection.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cnpj: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Restaurant.sync({ force: true });

module.exports = Restaurant;
