const express = require('express');
const router = express.Router();
const Additional = require('../../models/Additional');
const CheckToken = require('../../Util/AuthJWT');

router.get('/:restaurantId/additionals', CheckToken, (req, res) => {
  const { restaurantId } = req.params;

  Additional.findall({ where: { restaurantId } })
    .then((additionals) => {
      res.status(200).json({ additionals });
    })
    .catch((err) => {
      res.send(400).json({ message: err });
    });
});

module.exports = router;
