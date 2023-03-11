const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant/Restaurant');

router.post('/restaurant/save', (req, res) => {
  const { name, cnpj } = req.body;

  if (name !== undefined && cnpj !== undefined) {
    Restaurant.create({
      name,
      cnpj
    })
      .then(() => {
        res.status(200).redirect('/admin/restaurant/new');
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.redirect('/admin/restaurant/new');
  }
});

module.exports = router;
