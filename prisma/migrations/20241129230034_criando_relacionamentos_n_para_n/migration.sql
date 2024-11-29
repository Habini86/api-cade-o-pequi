/*
  Warnings:

  - You are about to drop the column `quantity` on the `fruits` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `fruits` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `locals` table. All the data in the column will be lost.
  - Added the required column `street` to the `locals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "fruits" DROP CONSTRAINT "fruits_userId_fkey";

-- AlterTable
ALTER TABLE "fruits" DROP COLUMN "quantity",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "locals" DROP COLUMN "address",
ADD COLUMN     "street" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "user_fruits" (
    "userId" TEXT NOT NULL,
    "fruitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "localFruitId" TEXT NOT NULL,
    "localId" TEXT NOT NULL,

    CONSTRAINT "user_fruits_pkey" PRIMARY KEY ("userId","fruitId")
);

-- AddForeignKey
ALTER TABLE "user_fruits" ADD CONSTRAINT "user_fruits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_fruits" ADD CONSTRAINT "user_fruits_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES "fruits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_fruits" ADD CONSTRAINT "user_fruits_localFruitId_localId_fkey" FOREIGN KEY ("localFruitId", "localId") REFERENCES "fruit_locals"("fruitId", "localId") ON DELETE RESTRICT ON UPDATE CASCADE;
