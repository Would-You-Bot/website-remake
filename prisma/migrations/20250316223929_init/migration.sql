-- CreateEnum
CREATE TYPE "PackType" AS ENUM ('wouldyourather', 'neverhaveiever', 'whatwouldyoudo', 'truth', 'dare', 'topic', 'mixed');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'resubmit_pending', 'approved', 'denied');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
