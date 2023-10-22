import fs from "fs";
import path from "path";
import { parse } from "csv";
import prisma from "@/utils/prisma";

const Handle = async () => {
  const csvPath = path.join(__dirname, "..", "files", "v1.csv");
  await new Promise((res, rej) => {
    fs.createReadStream(csvPath)
      .pipe(
        parse({
          delimiter: ";",
          fromLine: 2,
        })
      )
      .on("data", async (data) => {
        console.log(data);

        // prisma.music.create({
        //   data: {
        //     name: data[0],
        //     embedding: JSON.parse(data[1]),
        //   },
        // });
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
