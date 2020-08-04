const usersRouter = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const usersPath = path.join(__dirname, '../data/users.json');

usersRouter.get('/users', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      if (!users) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      }
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Исходный файл не найден' });
    });
});

function getUser(id, users) {
  // eslint-disable-next-line no-underscore-dangle
  return users.find((el) => el._id === id);
}

usersRouter.get('/users/:id', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      const seachedUser = getUser(req.params.id, users);
      if (!seachedUser) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(seachedUser);
    })
    .catch(() => {
      res.status(500).send({ message: 'Исходный файл не найден' });
    });
});

module.exports = usersRouter;
