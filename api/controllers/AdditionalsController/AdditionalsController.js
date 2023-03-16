const express = require('express');
const router = express.Router();
const Additional = require('../../models/additional/Additional');

router.get('/additional', (req, res) => {
  Additional.findall();
  console.log('teste tabela');
});

module.exports = router;
