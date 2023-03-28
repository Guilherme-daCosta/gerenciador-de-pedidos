const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/Restaurant');
const CheckToken = require('../../Util/AuthJWT');

router.patch('/:restaurantId/update', CheckToken, async(req, res) => {
  const { name, cnpj, email, city, state, street, number, zipCode } = req.body;
  const { restaurantId } = req.params;

  if (!name) {
    res.status(404).json({ message: 'Nome é obrigatório' });
  }

  if (!cnpj) {
    res.status(404).json({ message: 'CNPJ é obrigatório' });
  }

  if (!email) {
    res.status(404).json({ message: 'Email é obrigatório' });
  }

  try {
    Restaurant.update(
      {
        name,
        cnpj,
        email,
        city,
        state,
        street,
        number,
        zipCode
      },
      { where: { id: restaurantId } }
    );
    res.status(200).json({ message: 'Cadastro atualizado com sucesso!' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
