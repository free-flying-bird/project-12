const cardsRouter = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const cardsPath = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/cards', (req, res) => {
  fsPromises.readFile(cardsPath, { encoding: 'utf8' })
    .then((data) => {
      const cards = JSON.parse(data);
      if (!cards) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      }
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Исходный файл не найден' });
    });
});

module.exports = cardsRouter;
