/* eslint-disable eqeqeq */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const Users = require('../../../src/models/user/Users');
const CheckToken = require('../../Util/AuthJWT');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

router.delete('/:restaurantId/admin/user/:userId', CheckToken, async(req, res) => {
  const { userId } = req.params;
  const userExists = await Users.findOne({ where: { id: userId } });

  if (!userExists) {
    return res.status(422).json({ message: 'O usuário não existe' });
  }

  try {
    Users.destroy({ where: { id: userId } });
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    res.send(400).json({ message: err });
  }
});

router.post('/auth/user', async(req, res) => {
  const { userName, password } = req.body;

  if (!userName) {
    return res.status(422).json({ message: 'Email é obrigatório!' });
  }

  if (!password) {
    return res.status(422).json({ message: 'A senha é obrigatória!' });
  }

  const user = await Users.findOne({ where: { userName } });

  if (!user) {
    return res.status(404).json({ message: 'O usuário não encontrado' });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ message: 'Senha inválida!' });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({
      id: user.id
    },
    secret
    );

    res.status(200).json({ message: 'Autenticação realizada com sucesso!', token });
  } catch (err) {
    return res.status(500).json({ message: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
  }
});

module.exports = router;
