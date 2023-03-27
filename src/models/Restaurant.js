const Sequelize = require('sequelize');
const connection = require('./database');

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
  },
  city: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  state: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  street: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  number: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Restaurant.sync({ force: false });

module.exports = Restaurant;
