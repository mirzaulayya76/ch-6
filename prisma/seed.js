const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const mirza = await prisma.userGame.upsert({
    where: { username: 'mirza_ulayya05' },
    update: {},
    create: {
      username: 'mirza_ulayya05',
      password: 'password123',
    },
  });

  const fateh = await prisma.userGame.upsert({
    where: { username: 'fateh_anom10' },
    update: {},
    create: {
      username: 'fateh_anom10',
      password: 'password456',
    },
  });

  const anom = await prisma.userGame.upsert({
    where: { username: 'fairouz_zamani08' },
    update: {},
    create: {
      username: 'fairouz_zamani08',
      password: 'password789',
    },
  });

  console.log({ mirza, fateh, anom });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
