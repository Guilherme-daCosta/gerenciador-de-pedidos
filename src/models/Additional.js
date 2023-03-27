const Sequelize = require('sequelize');
const connection = require('./database');
const Restaurant = require('./Restaurant');

const Additional = connection.define('additionals', {
  item: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
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
