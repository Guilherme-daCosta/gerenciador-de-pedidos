const express = require('express');
const router = express.Router();
const Snack = require('../../models/snacks/Snacks');

router.get('/additional', (req, res) => {
  Snack.findall();
  console.log('teste tabela');
});

module.exports = router;
