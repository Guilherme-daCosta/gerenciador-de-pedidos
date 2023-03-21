const express = require('express');
const router = express.Router();
const Additional = require('../../models/Additional');
const CheckToken = require('../../Util/AuthJWT');

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

module.exports = router;
