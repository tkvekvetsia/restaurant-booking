/*
  Warnings:

  - Added the required column `restaurantAvatar` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantName` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "restaurantAvatar" TEXT NOT NULL,
ADD COLUMN     "restaurantName" TEXT NOT NULL;
