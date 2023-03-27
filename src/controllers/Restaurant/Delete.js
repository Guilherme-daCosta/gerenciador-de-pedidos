const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/Restaurant');
const CheckToken = require('../../Util/AuthJWT');

router.delete('/:restaurantId/delete', CheckToken, async(req, res) => {
  const { restaurantId } = req.params;

  Restaurant.destroy({ where: { id: restaurantId } })
    .then(() => {
      res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

module.exports = router;
