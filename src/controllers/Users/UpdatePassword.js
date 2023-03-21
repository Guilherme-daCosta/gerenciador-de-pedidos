/* eslint-disable eqeqeq */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const Users = require('../../../src/models/user/Users');
const CheckToken = require('../../Util/AuthJWT');
const HashPassword = require('../../Util/HashBcrypt');

router.patch('/:restaurantId/admin/user/:userId/pass', CheckToken, async(req, res) => {
  const { password, repeatpassword } = req.body;
  const { restaurantId, userId } = req.params;

  if (!password) {
    return res.status(422).json({ message: 'A senha é obrigatória!' });
  }

  if (password !== repeatpassword) {
    return res.status(422).json({ message: 'As senhas não conferem!' });
  }

  const userExists = await Users.findOne({ where: { id: userId } });

  if (!userExists) {
    return res.status(422).json({ message: 'O usuário não existe' });
  }

  try {
    Users.update({
      password: HashPassword(password),
      restaurantId
    }, { where: { id: userId } });
    res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  } catch (err) {
    res.send(400).json({ message: err });
  }
});

module.exports = router;
