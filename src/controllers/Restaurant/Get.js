const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/Restaurant');
const CheckToken = require('../../Util/AuthJWT');

router.get('/:restaurantId', CheckToken, (req, res) => {
  const { restaurantId } = req.params;

  Restaurant.findOne({ where: { id: restaurantId } })
    .then(restaurant => {
      res.status(200).json(restaurant);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

module.exports = router;
