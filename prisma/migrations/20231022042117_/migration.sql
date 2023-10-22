-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "music" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "embeddings" vector NOT NULL,

    CONSTRAINT "music_pkey" PRIMARY KEY ("id")
);
