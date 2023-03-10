const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient();

const allUsers = async () => {
  return await prisma.userGame.findMany();
};

const getUser = async () => {
  return await prisma.userGame.findUnique({
    where: { id: id },
  });
};

module.exports = { allUsers, getUser };
