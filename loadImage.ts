import { prisma } from "./lib/prisma";
import { writeFile } from "fs/promises";

async function loadImage() {
  const user = await prisma.user.findUnique({
    where: {
      id: 2,
    },
    select: {
      image: true,
    },
  });

  if (!user || !user.image) {
    throw new Error("画像が存在しません");
  }

  // Bufferをそのままファイルに書き出す
  await writeFile("./output.png", user.image);

  console.log("画像を output.png に保存しました");
}

loadImage()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
