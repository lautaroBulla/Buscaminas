-- CreateTable
CREATE TABLE `Games` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `help` BOOLEAN NOT NULL,
    `seconds` INTEGER NOT NULL,
    `difficulty` ENUM('easy', 'intermediate', 'expert', 'custom') NOT NULL,
    `rows` INTEGER NOT NULL,
    `cols` INTEGER NOT NULL,
    `mines` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Games` ADD CONSTRAINT `Games_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
