const express = require('express');
const router = express.Router();
const Snack = require('../../models/Snacks');
const CheckToken = require('../../Util/AuthJWT');

router.post('/:restaurantId/snacks', CheckToken, async(req, res) => {
  const { restaurantId } = req.params;
  const { type, size, flavor, description, price, categorie } = req.body;

  if (!type) {
    return res.status(422).json({ message: 'O tipo é obrigatório!' });
  }

  if (!size) {
    return res.status(422).json({ message: 'O tamanho é obrigatório!' });
  }

  if (!flavor) {
    return res.status(422).json({ message: 'O sabor é obrigatório!' });
  }

  if (!description) {
    return res.status(422).json({ message: 'A descrição é obrigatória!' });
  }

  if (!price) {
    return res.status(422).json({ message: 'O preço é obrigatório!' });
  }

  if (!categorie) {
    return res.status(422).json({ message: 'A categoria é obrigatória!' });
  }

  const snackExists = await Snack.findOne({ where: { restaurantId } });
  if (snackExists) {
    return res.status(401).json({ message: 'O item ja esta cadastrado!' });
  }

  try {
    Snack.create({
      type,
      size,
      flavor,
      description,
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
