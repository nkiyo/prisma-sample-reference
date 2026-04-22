import { prisma } from "./lib/prisma";

async function main() {
  const updatedUser = await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      email: "alice@hoge.com"
    }
  })
  console.log("Created user:", updatedUser);
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
