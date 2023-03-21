const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant/Restaurant');
const Users = require('../../models/user/Users');
const HashPassword = require('../../Util/HashBcrypt');
const GetUserName = require('../../Util/CreateUserName');
const CheckToken = require('../../Util/AuthJWT');

router.delete('/:restaurantId/delete', CheckToken, async(req, res) => {
  const { restaurantId } = req.params;

  Restaurant.destroy({ where: { id: restaurantId } })
    .then(() => {
      res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

router.patch('/:restaurantId/update', CheckToken, async(req, res) => {
  const { name, cnpj, email } = req.body;
  const { restaurantId } = req.params;

  if (!name) {
    res.status(404).json({ message: 'Nome é obrigatório' });
  }

  if (!cnpj) {
    res.status(404).json({ message: 'CNPJ é obrigatório' });
  }

  if (!email) {
    res.status(404).json({ message: 'Email é obrigatório' });
  }

  try {
    Restaurant.update({
      name,
      cnpj,
      email
    },
    { where: { id: restaurantId } });
    res.status(200).json({ message: 'Cadastro atualizado com sucesso!' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post('/restaurant/save', async(req, res) => {
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

  const restaurantExist = await Restaurant.findOne({ where: { cnpj } });

  if (restaurantExist) {
    res.status(401).json({ message: 'Este CNPJ ja está cadastrado!' });
  }

  const userName = await GetUserName(name.split(' ')[0], cnpj);

  try {
    Restaurant.create({
      name,
      cnpj,
      email
    })
      .then(restaurant => {
        Users.create({
          name: name.split(' ')[0],
          lastName: name.split(' ')[1],
          dateBirth: Date.now(),
          permissions: 'owner',
          userName,
          password: HashPassword(password),
          restaurantId: restaurant.id
        });
      });
    res.status(200).json({
      message:
      `Cadastro concluído com sucesso!
      Seu usuário de login corresponde as duas primeiras letras de seu nome e os quatro primeiros digitos do seu CNPJ.`
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
