//Ini variabel untuk mengakses database:
const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient();

const allUsers = (req, res) => {
  prisma.userGame
    .allUsers()
    .then((users) => {
      console.log('Read DB Success. Users:', users);
      res.json(users);
    })
    .catch((error) => {
      console.log('Ada ERROR DISINI:', error);
      res.json([]);
    });
};
const getUser = (req, res) => {
  const id = Number(req.params.id);
  prisma.userGame
    .findUnique({
      where: { id: id },
    })
    .then((users) => {
      if (!users) {
        throw new Error('User Not Found');
      }
      res.json(users);
    })
    .catch((error) => {
      console.log('Gak dapet id nya karna ada eror disini:', error);
      res.json({ status: 'player tidak ditemukan' });
    });
};
const createUser = async (req, res) => {
  if (!req.body) {
    res.json({
      status: 'Failed to Create User',
      message: 'Missing property in payload',
    });
    return;
  }
  if (!req.body.username) {
    res.json({
      status: 'Failed to Create User',
      message: 'Missing property "username" in payload',
    });
    return;
  }

  if (!req.body.password) {
    res.json({
      status: 'Failed to Create User',
      message: 'Missing property "password" in payload',
    });
    return;
  }

  try {
    const hasil = await prisma.userGame.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    res.json({
      status: 'Succes to Create User',
      info: hasil,
    });
  } catch (error) {
    res.json({
      status: 'Failed to Create User',
    });
  }
};
const editUser = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.body) {
    res.json({
      status: 'Failed to Update User',
      message: 'Missing property in payload',
    });
    return;
  }
  if (!req.body.username) {
    res.json({
      status: 'Failed to Update User',
      message: 'Missing property "username" in payload',
    });
    return;
  }

  if (!req.body.password) {
    res.json({
      status: 'Failed to Update User',
      message: 'Missing property "password" in payload',
    });
    return;
  }

  try {
    const hasil = await prisma.userGame.update({
      where: {
        id: id,
      },
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    res.json({
      status: 'Succes to Update User',
      info: hasil,
    });
  } catch (error) {
    res.json({
      status: 'Failed to Update User',
    });
  }
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  prisma.userGame
    .delete({ where: { id: id } })
    .then((info) => {
      res.json({ info });
    })
    .catch((error) => {
      res.json({
        status: 'Gagal menghapus user',
        message: error,
      });
    });
};

module.exports = {
  allUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
};
