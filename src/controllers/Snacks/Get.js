const express = require('express');
const router = express.Router();
const Snack = require('../../models/Snacks');
const CheckToken = require('../../Util/AuthJWT');

router.get('/:restaurantId/snacks', CheckToken, (req, res) => {
  const { restaurantId } = req.params;

  Snack.findall({ where: { restaurantId } })
    .then((additionals) => {
      res.status(200).json({ additionals });
    })
    .catch((err) => {
      res.send(400).json({ message: err });
    });
});

module.exports = router;
