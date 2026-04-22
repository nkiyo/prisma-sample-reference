import { prisma } from "./lib/prisma";
import { readFile } from "fs/promises";

async function saveImage() {
  const fileBuffer = await readFile('./sample.png')

  const user = await prisma.user.update({
    where: {
      id: 2,
    },
    data: {
      image: fileBuffer,
    },
  })
  console.log(user)
}

saveImage()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
