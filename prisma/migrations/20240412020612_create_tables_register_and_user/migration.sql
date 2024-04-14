-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('BRL', 'USD');

-- CreateTable
CREATE TABLE "registers" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "currencyType" "CurrencyType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registers_id_key" ON "registers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
