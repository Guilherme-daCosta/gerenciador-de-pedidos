const express = require('express');
const router = express.Router();
const Snack = require('../../models/Snacks');
const CheckToken = require('../../Util/AuthJWT');

router.get('/additional', CheckToken, (req, res) => {
  Snack.findall();
  console.log('teste tabela');
});

module.exports = router;
