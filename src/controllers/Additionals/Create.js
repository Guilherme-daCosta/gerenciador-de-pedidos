const express = require('express');
const router = express.Router();
const Additional = require('../../models/Additional');
const CheckToken = require('../../Util/AuthJWT');

router.post('/:restaurantId/additional/save', CheckToken, async(req, res) => {
  const { item, price, categorie } = req.body;
  const { restaurantId } = req.params;

  if (!item) {
    return res.status(422).json({ message: 'O item é obrigatório!' });
  }

  if (!price) {
    return res.status(422).json({ message: 'O preço é obrigatório!' });
  }

  if (!categorie) {
    return res.status(422).json({ message: 'A categoria é obrigatória!' });
  }

  const additionalExists = await Additional.findOne({ where: { item } });
  if (additionalExists) {
    return res.status(401).json({ message: 'O item ja esta cadastrado!' });
  }

  try {
    Additional.create({
      item,
      price,
      categorie,
      restaurantId
    });
    res.status(200).json({ message: 'Item adicionado com sucesso!' });
  } catch (err) {
    res.send(400).json({ message: err });
  }
});

module.exports = router;
