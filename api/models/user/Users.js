const Sequelize = require('sequelize');
const connection = require('../database');
const Restaurant = require('../restaurant/Restaurant');

const Users = connection.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateBirth: {
    type: Sequelize.DATE,
    allowNull: false
  },
  permissions: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Restaurant.hasMany(Users);
Users.belongsTo(Restaurant);

Users.sync({ force: false });

module.exports = Users;
