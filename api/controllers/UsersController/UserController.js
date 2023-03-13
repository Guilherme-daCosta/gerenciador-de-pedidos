/* eslint-disable eqeqeq */
const express = require('express');
const router = express.Router();
const Users = require('../../models/user/Users');

router.get('/restaurantid/admin/users', (req, res) => {
  SearchAllUsers()
    .then(users => {
      res.json({ users });
    })
    .catch((err) => res.status(400).send(err));
});

router.post('/:restaurantid/admin/users/save', (req, res) => {
  const { name, lastName, dateBirth, permissions, password, repeatpassword } = req.body;
  const { restaurantId } = req.params;

  if (restaurantId != undefined) {
    const userName = GetUserName(name, dateBirth);

    if (password === repeatpassword) {
      Users.findOne({ where: { userName } }).then((user) => {
        if (user == undefined) {
          CreateUser(name, lastName, dateBirth, permissions, userName, password, restaurantId)
            .then(() => {
              res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.status(401).json({ message: 'Usuário ja cadastrado!' });
        }
      });
    } else {
      res.status(403).json({ message: 'As senhas não conferem!' });
    }
  } else {
    res.status(400).json({ message: 'id não informado' });
  }
});

router.patch('/:restaurantId/admin/user/:userid', (req, res) => {
  const { name, lastName, dateBirth, permissions, password, repeatpassword } = req.body;
  const { restaurantId, userid } = req.params;

  if (restaurantId != undefined) {
    const userName = GetUserName(name, dateBirth);

    if (password === repeatpassword) {
      Users.findOne({ where: { id: userid } }).then((user) => {
        if (user != undefined) {
          UpdateUser(userid, name, lastName, dateBirth, permissions, userName, password, restaurantId)
            .then(() => {
              res.status(200).json({ message: 'Cadastro atualizado com sucesso!' });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.status(401).json({ message: 'Usuário não encontrado' });
        }
      });
    } else {
      res.status(403).json({ message: 'As senhas não conferem!' });
    }
  } else {
    res.status(400).json({ message: 'id não informado' });
  }
});

router.delete('/:restaurantid/admin/user/:userid', (req, res) => {
  const { userid } = req.params;

  Users.findOne({ where: { id: userid } }).then((user) => {
    if (user != undefined) {
      DeleteUser(userid)
        .then(() => {
          res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        })
        .catch((err) => res.status(400).send(err));
    } else {
      res.status(401).json({ message: 'Usuário não encontrado' });
    }
  });
});

function SearchAllUsers() {
  Users.findAll();
}

function CreateUser(name, lastName, dateBirth, permissions, userName, password, restaurantId) {
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

function UpdateUser(userid, name, lastName, dateBirth, permissions, userName, password, restaurantId) {
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

function DeleteUser(userId) {
  Users.destroy({ where: { id: userId } });
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
