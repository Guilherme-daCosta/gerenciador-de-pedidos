/* eslint-disable eqeqeq */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');
const CheckToken = require('../../Util/AuthJWT');

router.get('/:restaurantid/admin/users', CheckToken, (req, res) => {
  const restaurantId = req.params.restaurantid;

  Users.findAll({ where: { restaurantId } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

module.exports = router;
