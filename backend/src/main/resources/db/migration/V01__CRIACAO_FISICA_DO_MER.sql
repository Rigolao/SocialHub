CREATE DATABASE IF NOT EXISTS `socialhub`;

CREATE TABLE IF NOT EXISTS `socialhub`.`plano`
(
    IDPLANO                       BIGINT NOT NULL AUTO_INCREMENT,
    DESCRICAO                     VARCHAR(255) NOT NULL,
    NOME                          VARCHAR(45) NOT NULL,
    PRIMARY KEY (IDPLANO)
);

CREATE TABLE IF NOT EXISTS `socialhub`.`usuario`
(
    IDUSUARIO                     BIGINT NOT NULL AUTO_INCREMENT,
    NOME                          VARCHAR(50),
    DATA_NASCIMENTO               DATE NOT NULL,
    NUMDOC                        VARCHAR(50) NOT NULL UNIQUE,
    TPDOC                         VARCHAR(4) NOT NULL,
    EMAIL                         VARCHAR(100) NOT NULL UNIQUE ,
    SENHA                         VARCHAR(200) NOT NULL,
    PRIMARY KEY (IDUSUARIO)
);

CREATE TABLE IF NOT EXISTS `socialhub`.`plano_usuario`
(
    IDPLANO_USUARIO               BIGINT NOT NULL AUTO_INCREMENT,
    IDPLANO                       BIGINT NOT NULL,
    IDUSUARIO                     BIGINT NOT NULL,
    DATA_INICIO                   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DATA_FIM                      TIMESTAMP,
    VALOR                         DECIMAL(10,2),
    PRIMARY KEY (IDPLANO_USUARIO),
    FOREIGN KEY (IDPLANO) REFERENCES `socialhub`.`plano` (IDPLANO),
    FOREIGN KEY (IDUSUARIO) REFERENCES `socialhub`.`usuario` (IDUSUARIO)
);

CREATE TABLE IF NOT EXISTS `socialhub`.`fotousuario`
(
    IDFOTOUSUARIO                 BIGINT NOT NULL AUTO_INCREMENT,
    IDUSUARIO                     BIGINT NOT NULL,
    NOMEARQUIVO                   VARCHAR(45) NOT NULL,
    MIMETYPE                      VARCHAR(45) NOT NULL,
    ARQUIVO                       BLOB NOT NULL,
    PRIMARY KEY (IDFOTOUSUARIO),
    FOREIGN KEY (IDUSUARIO) REFERENCES `socialhub`.`usuario` (IDUSUARIO)
);

CREATE TABLE IF NOT EXISTS `socialhub`.`cargo`
(
    IDCARGO                       BIGINT NOT NULL AUTO_INCREMENT,
    DESCRICAO                     VARCHAR(45) NOT NULL,
    PRIMARY KEY (IDCARGO)
);

CREATE TABLE IF NOT EXISTS `socialhub`.`space`
(
    IDSPACE                       BIGINT NOT NULL AUTO_INCREMENT,
    NOME                          VARCHAR(50),
    PRIMARY KEY (IDSPACE)
);

CREATE TABLE IF NOT EXISTS `socialhub`.`usuario_space`
(
    IDUSUARIOSPACE                  BIGINT NOT NULL AUTO_INCREMENT,
    IDUSUARIO                       BIGINT NOT NULL,
    IDSPACE                         BIGINT NOT NULL,
    IDCARGO                         BIGINT NOT NULL,
    PRIMARY KEY (IDUSUARIOSPACE),
    FOREIGN KEY (IDUSUARIO) REFERENCES `socialhub`.`usuario` (IDUSUARIO),
    FOREIGN KEY (IDSPACE)   REFERENCES `socialhub`.`space`   (IDSPACE),
    FOREIGN KEY (IDCARGO)   REFERENCES `socialhub`.`cargo`   (IDCARGO)
);

CREATE TABLE IF NOT EXISTS `socialhub`.`postagem`
(
    IDPOSTAGEM                    BIGINT NOT NULL AUTO_INCREMENT,
    IDUSUARIOSPACE                BIGINT NOT NULL,
    DESCRICAO                     VARCHAR(500) NOT NULL,
    DATAAGENDAMENTO               TIMESTAMP NOT NULL,
    PRIMARY KEY (IDPOSTAGEM),
    FOREIGN KEY (IDUSUARIOSPACE) REFERENCES `socialhub`.`usuario_space`(IDUSUARIOSPACE)
);

CREATE TABLE IF NOT EXISTS `socialhub`.`anexo`
(
    IDANEXO                       BIGINT NOT NULL AUTO_INCREMENT,
    IDPOSTAGEM                    BIGINT NOT NULL,
    NOMEARQUIVO                   VARCHAR(45) NOT NULL,
    MIMETYPE                      VARCHAR(45) NOT NULL,
    ARQUIVO                       BLOB NOT NULL,
    PRIMARY KEY (IDANEXO),
    FOREIGN KEY (IDPOSTAGEM) REFERENCES `socialhub`.`postagem`(IDPOSTAGEM)
);

CREATE TABLE IF NOT EXISTS `socialhub`.`redsocial`
(
    IDREDESOCIAL                  BIGINT NOT NULL AUTO_INCREMENT,
    NOME                          VARCHAR(45) NOT NULL,
    PRIMARY KEY (IDREDESOCIAL)
);


CREATE TABLE IF NOT EXISTS `socialhub`.`conta`
(
    IDCONTA                       BIGINT NOT NULL AUTO_INCREMENT,
    IDSPACE                       BIGINT NOT NULL,
    IDREDESOCIAL                  BIGINT NOT NULL,
    TOKEN                         VARCHAR(200),
    PRIMARY KEY (IDCONTA),
    FOREIGN KEY (IDSPACE) REFERENCES `socialhub`.`space` (IDSPACE),
    FOREIGN KEY (IDREDESOCIAL) REFERENCES `socialhub`.`redsocial` (IDREDESOCIAL)
);


CREATE TABLE IF NOT EXISTS `socialhub`.`conta_postagem`
(
    IDCONTA_POSTAGEM              BIGINT NOT NULL AUTO_INCREMENT,
    IDCONTA                       BIGINT NOT NULL,
    IDPOSTAGEM                    BIGINT NOT NULL,
    DATAPOSTAGEM                  TIMESTAMP NOT NULL,
    PRIMARY KEY (IDCONTA_POSTAGEM),
    FOREIGN KEY (IDCONTA) REFERENCES `socialhub`.`conta` (IDCONTA),
    FOREIGN KEY (IDPOSTAGEM) REFERENCES `socialhub`.`postagem` (IDPOSTAGEM)
);
