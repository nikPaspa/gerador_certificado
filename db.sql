CREATE DATABASE IF NOT EXISTS geradorcertificado;
USE geradorcertificado;
CREATE TABLE IF NOT EXISTS diplomas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    nacionalidade VARCHAR(255),
    estado VARCHAR(255),
    data_nascimento DATE,
    documento VARCHAR(20),
    data_conclusao DATE,
    curso VARCHAR(255),
    carga_horaria INT,
    data_emissao DATE,
    nome_assinatura VARCHAR(255),
    cargo_assinatura VARCHAR(255)
);
