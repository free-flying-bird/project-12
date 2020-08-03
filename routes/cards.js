const cardsRouter = require('express').Router();
const path = require('path');
const cardsPath = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/cards', (req, res) => {
  if (!cardsPath) {
    res.status(500).send({ message: 'Запрашиваемый ресурс не найден' })
  }
  res.send(require(cardsPath));
});

module.exports = cardsRouter;