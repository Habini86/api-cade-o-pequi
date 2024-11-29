-- CreateEnum
CREATE TYPE "FruitType" AS ENUM ('Pequi', 'Buriti', 'Mangaba', 'Cagaita', 'Araticum', 'Guabiroba', 'Murici', 'Mama_cadela', 'Baru', 'Bocaiuva');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "password_Hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fruits" (
    "id" TEXT NOT NULL,
    "name" "FruitType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "fruits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locals" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fruit_locals" (
    "fruitId" TEXT NOT NULL,
    "localId" TEXT NOT NULL,

    CONSTRAINT "fruit_locals_pkey" PRIMARY KEY ("fruitId","localId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "fruits" ADD CONSTRAINT "fruits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fruit_locals" ADD CONSTRAINT "fruit_locals_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES "fruits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fruit_locals" ADD CONSTRAINT "fruit_locals_localId_fkey" FOREIGN KEY ("localId") REFERENCES "locals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
