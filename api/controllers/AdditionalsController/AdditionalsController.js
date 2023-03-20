const express = require('express');
const router = express.Router();
const Additional = require('../../models/Additional');
const jwt = require('jsonwebtoken');

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

  const itemExists = await Additional.findOne({ where: { item } });
  if (itemExists) {
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

router.patch('/:restaurantId/additional/:id/update', CheckToken, async(req, res) => {
  const { item, price, categorie } = req.body;
  const { id, restaurantId } = req.params;

  const itemExists = Additional.findOne({ where: { id } });
  if (!itemExists) {
    return res.status(401).json({ message: 'O item não esta cadastrado!' });
  }

  try {
    Additional.update(
      {
        item,
        price,
        categorie,
        restaurantId
      },
      { where: { id } }
    );
    res.status(200).json({ message: 'Item alterado com sucesso!' });
  } catch (err) {
    res.send(400).json({ message: err });
  }
}
);

router.delete('/:restaurantId/additional/:id/delete', CheckToken, async(req, res) => {
  const { id } = req.params;

  const itemExists = Additional.findOne({ where: { id } });
  if (!itemExists) {
    return res.status(401).json({ message: 'O item não esta cadastrado!' });
  }

  try {
    Additional.destroy({ where: { id } });
    res.status(200).json({ message: 'Item deletado com sucesso!' });
  } catch (err) {
    res.send(400).json({ message: err });
  }
}
);

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
