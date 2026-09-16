DROP DATABASE IF EXISTS portfolio;
CREATE DATABASE portfolio;
USE portfolio; 

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

INSERT INTO usuario (email, senha)
VALUES ('admin@email', '1234'), ('prof@email', '1234');
SELECT * FROM usuario;
