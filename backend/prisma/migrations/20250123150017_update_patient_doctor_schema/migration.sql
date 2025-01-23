-- AlterTable
ALTER TABLE `patient` ADD COLUMN `assignedDoctorId` INTEGER NULL,
    ADD COLUMN `isAssigned` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Doctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `specialization` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
