const fs = require("fs");
const path = require("path");
const { parse } = require("csv");
const prisma = require("../src/utils/prisma.ts");

const Handle = async () => {
  const csvPath = path.join(__dirname, "..", "files", "v1-reduced.csv");
  await new Promise((res, rej) => {
    fs.createReadStream(csvPath)
      .pipe(
        parse({
          delimiter: ",",
          fromLine: 2,
        })
      )
      .on("data", async (data) => {
        console.log(data);

        prisma.music.create({
          data: {
            name: data[0],
            embedding: data[1],
          },
        });
      })
      .on("end", () => {
        console.info("Não FODEU");
        return res("OK");
      })
      .on("error", (err) => {
        console.info("FODEU", err);
        return rej();
      });
  });
};

Handle();
