import db from "@/utils/pg";
import prisma from "@/utils/prisma";
import cohere from "cohere-ai";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(req: NextRequest) {
  const preferences = req.nextUrl.searchParams.get("preferences");

  if (!preferences) {
    return new Response("PUTSS", {
      status: 400,
    });
  }

  try {
    if (!process.env.COHERE_KEY)
      return new Response("Internal Server Error", {
        status: 500,
      });

    cohere.init(process.env.COHERE_KEY);

    const response = await cohere.embed({
      model: "embed-multilingual-v2.0",
      texts: [preferences],
    });

    const inputEmebedding = `[${response.body.embeddings[0]}]`;

    // Eu sou burro não está funcionando
    // const res =
    //   await prisma.$queryRaw`SELECT * FROM music ORDER BY embeddings <-> VECTOR(${inputEmebedding}) LIMIT 10`;
    // console.log(res);

    const rows = await db.query(
      `SELECT * FROM music ORDER BY embeddings <-> '${inputEmebedding}' LIMIT 40`
    );

    const musics = rows.rows.map((r) => ({
      name: r.name,
      author: r.author,
      year: r.year,
    }));

    return NextResponse.json(musics);
  } catch (error) {
    console.log(error);
    console.info(error);

    return new Response("DEU RUIM PAPAI", {
      status: 400,
    });
  }
}
