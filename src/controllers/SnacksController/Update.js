const express = require('express');
const router = express.Router();
const Snack = require('../../models/Snacks');
const CheckToken = require('../../Util/AuthJWT');

router.patch('/:restaurantId/snacks/:id', CheckToken, (req, res) => {
  const { restaurantId, id } = req.params;
  const { type, size, flavor, description, price, categorie } = req.body;

  Snack.update(
    {
      type,
      size,
      flavor,
      description,
      price,
      categorie,
      restaurantId
    },
    { where: { id } }
  )
    .then(() => {
      res.status(200).json({ message: 'Item alterado com sucesso!' });
    })
    .catch((err) => {
      res.send(400).json({ message: err });
    });
});

module.exports = router;
