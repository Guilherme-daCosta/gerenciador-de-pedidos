const Sequelize = require('sequelize');
const connection = require('./database');
const Restaurant = require('./Restaurant');

const Snack = connection.define('snacks', {
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

Snack.sync({ force: false });

module.exports = Snack;
