const express = require('express');
const router = express.Router();
const Snack = require('../../models/Snacks');
const CheckToken = require('../../Util/AuthJWT');

router.delete('/:restaurantId/snacks/:id/del', CheckToken, (req, res) => {
  const { id } = req.params;

  Snack.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ message: 'Item deletado com sucesso!' });
    })
    .catch((err) => {
      res.send(400).json({ message: err });
    });
});

module.exports = router;
