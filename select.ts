import { prisma } from "./lib/prisma";

async function main() {
  // 1
  const users1 = await prisma.user.findMany({
    where: {
      name: "Bob",
    },
    include: {
      posts: true
    }
  })
  // console.log("Users1:", JSON.stringify(users1));

  // 2
  const users2 = await prisma.user.findMany({
    include: {
      posts: {
        where: {
          authorId: {
            gte: 2
          }
        }
      }
    }
  })
  // console.log("Users2:", JSON.stringify(users2));

  // 3 <= 空のpostsが出力されたり、よくわからない
  const users3 = await prisma.user.findMany({
    select: {
      posts: {
        where: {
          authorId: {
            gte: 2,
          }
        },
        select: {
          authorId: true,
          content: true
        }
      }
    }
  })
  console.log("Users3:", JSON.stringify(users3));
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
