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
            help: 1,
            seconds: 15.123,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
            n3BV: 5,
            clicks: 5,
            efficiency: 100
          },
          {    
            help: 2,
            seconds: 10.000,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
            n3BV: 5,
            clicks: 6,
            efficiency: 90
          },
          {           
            help: 1,
            seconds: 100.453,
            difficulty: 'expert',
            rows: 30,
            cols: 16,
            mines: 99,
            n3BV: 23,
            clicks: 34,
            efficiency: 76
          },
          {        
            help: 3,
            seconds: 200.120,
            difficulty: 'custom',
            rows: 44,
            cols: 70,
            mines: 308,
            n3BV: 67,
            clicks: 80,
            efficiency: 80
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
            help: 0,
            seconds: 13.120,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
            n3BV: 5,
            clicks: 5,
            efficiency: 100
          },
          {     
            help: 2,
            seconds: 10.123,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
            n3BV: 5,
            clicks: 5,
            efficiency: 100
          },
          {           
            help: 7,
            seconds: 59.324,
            difficulty: 'intermediate',
            rows: 16,
            cols: 16,
            mines: 40,
            n3BV: 67,
            clicks: 80,
            efficiency: 80
          },
          {           
            help: 0,
            seconds: 250.154,
            difficulty: 'custom',
            rows: 44,
            cols: 70,
            mines: 308,
            n3BV: 89,
            clicks: 99,
            efficiency: 86
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
            help: 0,
            seconds: 13.253,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
            n3BV: 5,
            clicks: 5,
            efficiency: 100
          },
          {        
            help: 0,
            seconds: 10,
            difficulty: 'easy',
            rows: 9,
            cols: 9,
            mines: 10,
            n3BV: 5,
            clicks: 5,
            efficiency: 100
          },
          {       
            help: 0,
            seconds: 123.291,
            difficulty: 'custom',
            rows: 44,
            cols: 22,
            mines: 90,
            n3BV: 23,
            clicks: 32,
            efficiency: 64
          },
          {        
            help: 2,
            seconds: 150.005,
            difficulty: 'custom',
            rows: 44,
            cols: 22,
            mines: 90,
            n3BV: 50,
            clicks: 100,
            efficiency: 50
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