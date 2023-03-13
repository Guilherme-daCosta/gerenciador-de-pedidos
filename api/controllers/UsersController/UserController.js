/* eslint-disable eqeqeq */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const Users = require('../../models/user/Users');
const jwt = require('jsonwebtoken');

router.get('/:restaurantid/admin/users', CheckToken, (req, res) => {
  const restaurantId = req.params.restaurantid;

  Users.findAll({ where: { restaurantId } })
    .then(users => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post('/:restaurantid/admin/users/save', CheckToken, async(req, res) => {
  const { name, lastName, dateBirth, permissions, password, repeatPassword } = req.body;
  const { restaurantId } = req.params;

  if (!name) {
    return res.status(422).json({ message: 'O nome é obrigatório!' });
  }

  if (!lastName) {
    return res.status(422).json({ message: 'O sobrenome é obrigatório!' });
  }

  if (!dateBirth) {
    return res.status(422).json({ message: 'A data de nascimento é obrigatória!' });
  }

  if (!permissions) {
    return res.status(422).json({ message: 'O tipo de usuário deve ser informado!' });
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

function GetUserName(name, dateBirth) {
  return name.toLowerCase().substring(0, 2) + dateBirth.substring(7, 10);
}

function CheckToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido!' });
  }
}

const bcrypt = require('bcryptjs');
function HashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = router;
