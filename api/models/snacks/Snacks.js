const Sequelize = require('sequelize');
const connection = require('../database');
const Restaurant = require('../restaurant/Restaurant');

const Snack = connection.define('categories', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false
  },
  flavor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  categorie: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Restaurant.hasMany(Snack);
Snack.belongsTo(Restaurant);

Snack.sync({ force: true });

module.exports = Snack;
