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
      password: "$2y$12$forQVGQ2jAEQk1E4HQCLfO2DOMhcGVH89/TUZYQzKc0Cp8yGiVs5i",
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
