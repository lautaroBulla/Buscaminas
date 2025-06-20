const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  const hashedPassword = await bcrypt.hash('Password123.', 10);

  // Crea un usuario de prueba
  const user = await prisma.user.create({
    data: {
      username: 'user1',
      password: hashedPassword,
      games: {
        create: [
          {
            help: false,
            seconds: 15,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
          },
          {
            help: false,
            seconds: 10,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
          },
          {
            help: false,
            seconds: 100,
            difficulty: 'expert',
            rows: 30,
            cols: 16,
            mines: 99,
          },
          {
            help: false,
            seconds: 200,
            difficulty: 'custom',
            rows: 44,
            cols: 70,
            mines: 308,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      password: hashedPassword,
      games: {
        create: [
          {
            help: false,
            seconds: 13,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
          },
          {
            help: true,
            seconds: 10,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
          },
          {
            help: false,
            seconds: 59,
            difficulty: 'intermediate',
            rows: 16,
            cols: 16,
            mines: 40,
          },
          {
            help: true,
            seconds: 250,
            difficulty: 'custom',
            rows: 44,
            cols: 70,
            mines: 308,
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'user3',
      password: hashedPassword,
      games: {
        create: [
          {
            help: false,
            seconds: 13,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
          },
          {
            help: true,
            seconds: 10,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
          },
          {
            help: false,
            seconds: 123,
            difficulty: 'custom',
            rows: 44,
            cols: 22,
            mines: 90,
          },
          {
            help: true,
            seconds: 150,
            difficulty: 'custom',
            rows: 44,
            cols: 22,
            mines: 90,
          },
        ],
      },
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });