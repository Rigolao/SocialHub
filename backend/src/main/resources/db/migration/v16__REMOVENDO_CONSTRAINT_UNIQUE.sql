ALTER TABLE `conta`
DROP FOREIGN KEY `conta_ibfk_2`;

ALTER TABLE `conta`
DROP FOREIGN KEY `conta_ibfk_1`;

ALTER TABLE `conta`
DROP INDEX `UNIQUE_CONTA_REDESOCIAL`;

ALTER TABLE `socialhub`.`conta`
    ADD CONSTRAINT `conta_ibfk_2`
        FOREIGN KEY (`IDREDESOCIAL`) REFERENCES `redesocial` (`IDREDESOCIAL`);

ALTER TABLE `socialhub`.`conta`
    ADD CONSTRAINT `conta_ibfk_1`
        FOREIGN KEY (`IDSPACE`) REFERENCES `space` (`IDSPACE`);
