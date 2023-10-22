const fs = require("fs");
const path = require("path");
const { parse } = require("csv");
const { PrismaClient } = require("@prisma/client");

const Handle = async () => {
  const prisma = new PrismaClient();

  const csvPath = path.join(__dirname, "..", "files", "v2.csv");
  await new Promise((res, rej) => {
    fs.createReadStream(csvPath)
      .pipe(
        parse({
          delimiter: ",",
          fromLine: 2,
        })
      )
      .on("data", async (data: [string, string]) => {
        console.log(data[0]);
        const embbeding = `[${data[1]}]`;

        await prisma.$executeRaw`INSERT INTO MUSIC (name, embeddings) VALUES (${data[0]}, Vector(${embbeding}))`;
      })
      .on("end", () => {
        console.info("Deu certo");
        return res("OK");
      })
      .on("error", (err: any) => {
        console.info("Não deu certo", err);
        return rej();
      });
  });
};

Handle();
