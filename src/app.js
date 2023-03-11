const express = require('express');
const connection = require('../api/models/database');

const app = express();

const RestaurantController = require('../api/controllers/RestaurantController/RestaurantController');
const UserController = require('../api/controllers/UsersController/UserController');

app.use(express.json());

connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com sucesso!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/', RestaurantController);
app.use('/', UserController);

app.get('/', (req, res) => {
  res.status(200).send('Rota teste');
});

app.listen(3333, () => {
  console.log('O servidor está rodando!');
});
