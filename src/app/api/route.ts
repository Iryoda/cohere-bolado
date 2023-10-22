import prisma from "@/utils/prisma";
import cohere from "cohere-ai";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const formData = await req.formData();

  const preferences = formData.get("preference");

  if (!preferences)
    return new Response("PUTSS", {
      status: 400,
    });

  try {
    if (!process.env.COHERE_KEY)
      return new Response("Internal Server Error", {
        status: 500,
      });

    cohere.init(process.env.COHERE_KEY);

    const response = await cohere.embed({
      model: "embed-multilingual-v2.0",
      texts: [preferences.toString()],
    });

    const inputEmebedding = `[${response.body.embeddings[1]}]`;

    const result =
      await prisma.$queryRaw`SELECT * FROM music ORDER BY embbedings <-> VECTOR(${inputEmebedding}) LIMIT 10`;

    console.log(result);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);

    return new Response("PUTSS", {
      status: 400,
    });
  }
}
