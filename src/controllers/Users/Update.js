/* eslint-disable eqeqeq */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');
const CheckToken = require('../../Util/AuthJWT');
const GetUserName = require('../../Util/CreateUserName');

router.patch('/:restaurantId/admin/user/:userId', CheckToken, async(req, res) => {
  const { name, lastName, dateBirth, permissions } = req.body;
  const { restaurantId, userId } = req.params;
  const userName = GetUserName(name, dateBirth);
  const userExists = await Users.findOne({ where: { id: userId } });

  if (!userExists) {
    res.status(401).json({ message: 'O usuário não existe' });
  }

  try {
    Users.update({
      name,
      lastName,
      dateBirth,
      permissions,
      userName,
      restaurantId
    }, { where: { id: userId } });
    res.status(200).json({ message: 'Cadastro atualizado com sucesso!' });
  } catch (err) {
    res.send(400).json({ message: err });
  }
});

module.exports = router;
