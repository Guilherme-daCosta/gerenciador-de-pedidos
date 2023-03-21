const express = require('express');
const connection = require('../api/models/database');

const app = express();

const CreateRestaurant = require('./controllers/Restaurant/Create');
const GetRestaurant = require('./controllers/Restaurant/Get');
const UpdateRestaurant = require('./controllers/Restaurant/Update');
const DeleteRestaurant = require('./controllers/Restaurant/Delete');

const AuthUser = require('./controllers/Users/Auth');
const CreateUser = require('./controllers/Users/Create');
const GetUser = require('./controllers/Users/Get');
const UpdateUser = require('./controllers/Users/Update');
const UpdatePasswordUser = require('./controllers/Users/UpdatePassword');
const DeleteUser = require('./controllers/Users/Delete');

const GetAdditionals = require('./controllers/Additionals/Get');
const Createadditionals = require('./controllers/Additionals/Create');
const UpdateAdditionals = require('./controllers/Additionals/Update');
const DeleteAdditionals = require('./controllers/Additionals/Delete');

const SnacksController = require('../api/controllers/SnacksController/SnacksController');

app.use(express.json());

connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com sucesso!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/', CreateRestaurant);
app.use('/', GetRestaurant);
app.use('/', UpdateRestaurant);
app.use('/', DeleteRestaurant);

app.use('/', AuthUser);
app.use('/', CreateUser);
app.use('/', GetUser);
app.use('/', UpdateUser);
app.use('/', UpdatePasswordUser);
app.use('/', DeleteUser);

app.use('/', GetAdditionals);
app.use('/', Createadditionals);
app.use('/', UpdateAdditionals);
app.use('/', DeleteAdditionals);

app.use('/', SnacksController);

app.get('/', (req, res) => {
  res.status(200).send('Rota teste');
});

app.listen(3333, () => {
  console.log('O servidor está rodando!');
});
