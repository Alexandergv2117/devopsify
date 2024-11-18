import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.upsert({
    where: { role: "admin" },
    update: {},
    create: {
      role: "admin",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@devopsify.io" },
    update: {},
    create: {
      email: "admin@devopsify.io",
      password: "$2b$10$R6OZIqpT.587EeN.iJK7r.KhMTISPTkKgQmUqYW/.Bg1mcuN4ubjm",
      name: "Admin",
      username: "admin",
      role: {
        connect: {
          role: "admin",
        },
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
