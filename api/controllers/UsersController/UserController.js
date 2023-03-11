/* eslint-disable eqeqeq */
const express = require('express');
const router = express.Router();
const Users = require('../../api/api/models/user/Users');

router.post('/:restaurantid/admin/users/save', (req, res) => {
  const { name, lastName, dateBirth, permissions, password } = req.body;
  const { restaurantId } = req.params;
  const userName = GetUserName(name, dateBirth);

  Users.findOne({ where: { userName } }).then((user) => {
    if (user == undefined) {
      CreateUser(
        name,
        lastName,
        dateBirth,
        permissions,
        userName,
        password,
        restaurantId
      );
      res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    } else {
      res.status(401).json({ message: 'Usuário ja cadastrado!' });
    }
  });
});

router.patch('/:restaurantid/admin/user/:userid', (req, res) => {
  const { name, lastName, dateBirth, permissions, password } = req.body;
  const { restaurantId, userid } = req.params;
  const userName = GetUserName(name, dateBirth);

  Users.findOne({ where: { id: userid } }).then((user) => {
    if (user != undefined) {
      UpdateUser(
        userid,
        name,
        lastName,
        dateBirth,
        permissions,
        userName,
        password,
        restaurantId
      );
      res.status(200).json({ message: 'Cadastro atualizado com sucesso!' });
    } else {
      res.status(401).json({ message: 'Usuário não encontrado' });
    }
  });
});

function CreateUser(
  name,
  lastName,
  dateBirth,
  permissions,
  userName,
  password,
  restaurantId
) {
  Users.create({
    name,
    lastName,
    dateBirth,
    permissions,
    userName,
    password: HashPassword(password),
    restaurantId
  });
}

function UpdateUser(
  userid,
  name,
  lastName,
  dateBirth,
  permissions,
  userName,
  password,
  restaurantId
) {
  Users.update(
    {
      name,
      lastName,
      dateBirth,
      permissions,
      userName,
      password: HashPassword(password),
      restaurantId
    },
    { where: { id: userid } }
  );
}

function GetUserName(name, dateBirth) {
  return name.toLowerCase().substring(0, 2) + dateBirth.substring(7, 10);
}

const bcrypt = require('bcryptjs');
function HashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = router;
