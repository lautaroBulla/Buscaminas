/*
  Warnings:

  - You are about to alter the column `seconds` on the `games` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,3)`.

*/
-- AlterTable
ALTER TABLE `games` MODIFY `seconds` DECIMAL(8, 3) NOT NULL;
