/*
  Warnings:

  - Added the required column `ownerId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
