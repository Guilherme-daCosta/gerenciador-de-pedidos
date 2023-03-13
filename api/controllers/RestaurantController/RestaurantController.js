const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant/Restaurant');
const Users = require('../../models/user/Users');

router.post('/restaurant/save', (req, res) => {
  const { name, cnpj, email, password, repeatPassword } = req.body;

  if (!name) {
    res.status(404).json({ message: 'Nome é obrigatório' });
  }

  if (!cnpj) {
    res.status(404).json({ message: 'CNPJ é obrigatório' });
  }

  if (!email) {
    res.status(404).json({ message: 'Email é obrigatório' });
  }

  if (!password) {
    res.status(404).json({ message: 'Senha é obrigatória' });
  }

  if (password !== repeatPassword) {
    return res.status(422).json({ message: 'As senhas não conferem!' });
  }

  try {
    Restaurant.create({
      name,
      cnpj,
      email
    });

    const userName = GetUserName(name.split(' '), Date.now());

    Users.create({
      name: name.split(' ')[0],
      lastName: name.split(' ')[1],
      dateBirth: Date.now(),
      permissions: 'owner',
      userName,
      password: HashPassword(password)
    });

    res.send(200).json({
      message: `Cadastro realizado com sucesso! Em alguns instante você irá receber seu usuário de login no seu email(${email}).`
    });
  } catch (err) {
    res.send(400).json({ message: err });
  }
});

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
