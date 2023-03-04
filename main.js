const express = require('express');

const app = express();

const {
  allUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
} = require('./userController');

app.get('/', (req, res) => res.send('Hello World! Welcome!'));

app.get('/user', allUsers);

app.get('/user/:id', getUser);

app.post('/user', createUser);

app.put('/user/:id', editUser);

app.delete('/user/:id', deleteUser);

app.listen(8080, () => {
  console.log(`Server is working at localhost:${8080}`);
});
