const express = require('express');

// const { readFile } = require('fs/promises');

const app = express();

// Import prisma
const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient();

const {
  allUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
} = require('./userController');

// Ini Middleware:
app.use(express.json());

// Middleware untuk login:
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Import file CSS:
app.use('/static', express.static('public'));

// Handler untuk login:
app.post('/user/login', (req, res) => {
  console.log('test klik login');
  const { username, password } = req.body;
  console.log('username:', username);
  console.log('password:', password);

  // Logic untuk masuk login:
  if (username === username && password === password) {
    res.redirect('/userlist');
  } else {
    res.redirect('/user/login');
  }
});

// Handler untuk Create:
app.post('/create-account', async (req, res) => {
  const { username, password } = req.body;

  await prisma.userGame.create({
    data: {
      username,
      password,
    },
  });

  res.redirect('/userlist');
});

// Handler untuk Edit/Update User:
app.post('/user/update', async (req, res) => {
  const { id, username, password } = req.body;
  const numberId = Number(id);
  await prisma.userGame.update({
    where: { id: numberId },
    data: { username, password },
  });
  res.redirect('/userlist');
});

// Ini untuk initiate ejs nya:
app.set('view engine', 'ejs');

// Route for HTML:
app.get('/userlist', (req, res) => {
  prisma.userGame.findMany().then((users) =>
    res.render('index', {
      users: users,
    }),
  );
});

app.get('/user/login', (req, res) => {
  res.render('login');
});

app.get('/create-account', (req, res) => {
  res.render('create');
});

app.get('/user/update/:id', async (req, res) => {
  const id = Number(req.params.id);

  const users = await prisma.userGame.findUnique({
    where: { id },
  });
  res.render('update-user', { users });
});

// Route for API:

app.get('/user', allUsers);

app.get('/user/:id', getUser);

app.post('/user', createUser);

app.put('/user/:id', editUser);

app.delete('/user/:id', deleteUser);

app.listen(8080, () => {
  console.log(`Server is working at localhost:${8080}`);
});
