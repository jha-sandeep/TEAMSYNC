import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Sandeep Jha",
      email: "sandeep@example.com",
      password: "password123",
      role: "ADMIN",
    },
  });

  console.log("User created:");
  console.log(user);
}

main()
  .catch((error) => {
    console.error(error);
    
  })
  .finally(async () => {
    await prisma.$disconnect();
  });