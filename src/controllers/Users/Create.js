/* eslint-disable eqeqeq */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');
const CheckToken = require('../../Util/AuthJWT');
const HashPassword = require('../../Util/HashBcrypt');
const GetUserName = require('../../Util/GetUserName');

router.post('/:restaurantId/admin/users/save', CheckToken, async(req, res) => {
  const { name, lastName, dateBirth, permissions, password, repeatPassword } = req.body;
  const { restaurantId } = req.params;

  if (!name) {
    return res.status(422).json({ message: 'O nome é obrigatório!' });
  }

  if (!lastName) {
    return res.status(422).json({ message: 'O sobrenome é obrigatório!' });
  }

  if (!dateBirth) {
    return res
      .status(422)
      .json({ message: 'A data de nascimento é obrigatória!' });
  }

  if (!permissions) {
    return res
      .status(422)
      .json({ message: 'O tipo de usuário deve ser informado!' });
  }

  if (!password) {
    return res.status(422).json({ message: 'A senha é obrigatória!' });
  }

  if (password !== repeatPassword) {
    return res.status(422).json({ message: 'As senhas não conferem!' });
  }

  const userName = GetUserName(name, dateBirth);
  const userExists = await Users.findOne({ where: { userName } });

  if (userExists) {
    res.status(401).json({ message: 'Usuário ja cadastrado!' });
  }

  try {
    Users.create({
      name,
      lastName,
      dateBirth,
      permissions,
      userName,
      password: HashPassword(password),
      restaurantId
    });
    res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
  } catch (err) {
    res.send(400).json({ message: err });
  }
});

module.exports = router;
