-- CreateTable
CREATE TABLE `patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastName` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `condition` ENUM('LIGHT', 'MEDIUM', 'BAD', 'CRITICAL') NOT NULL,
    `date_of_arrival` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `medical_record` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
