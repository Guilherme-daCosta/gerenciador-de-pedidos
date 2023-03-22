const express = require('express');
const router = express.Router();
const Additional = require('../../models/Additional');
const CheckToken = require('../../Util/AuthJWT');

router.delete('/:restaurantId/additional/:id/delete', CheckToken, (req, res) => {
  const { id } = req.params;

  Additional.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ message: 'Item deletado com sucesso!' });
    })
    .catch((err) => {
      res.send(400).json({ message: err });
    });
}
);

module.exports = router;
