/*
  Warnings:

  - You are about to alter the column `seconds` on the `games` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - Added the required column `clicks` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `efficiency` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `n3BV` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `games` ADD COLUMN `clicks` INTEGER NOT NULL,
    ADD COLUMN `efficiency` INTEGER NOT NULL,
    ADD COLUMN `n3BV` INTEGER NOT NULL,
    MODIFY `seconds` DECIMAL(65, 30) NOT NULL;
