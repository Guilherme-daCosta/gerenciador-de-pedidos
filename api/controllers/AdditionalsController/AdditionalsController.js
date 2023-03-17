const express = require('express');
const router = express.Router();
const Additional = require('../../models/additional/Additional');
const jwt = require('jsonwebtoken');

router.get('/additional', CheckToken, (req, res) => {
  Additional.findall();
  console.log('teste tabela');
});

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

module.exports = router;
