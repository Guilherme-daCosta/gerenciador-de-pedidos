const Sequelize = require('sequelize');
const connection = require('../database');
const Restaurant = require('../restaurant/Restaurant');

const Additional = connection.define('categories', {
  item: {
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

Restaurant.hasMany(Additional);
Additional.belongsTo(Restaurant);

Additional.sync({ force: false });

module.exports = Additional;
