/* eslint-disable eqeqeq */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');
const CheckToken = require('../../Util/AuthJWT');

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
    res.status(400).json({ message: err });
  }
});

module.exports = router;
