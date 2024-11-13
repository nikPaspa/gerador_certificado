na pasta api abra seu terminal e digite o codigo: npm install
na pasta worker abra seu terminal e digite o codigo: npm install
para acessar o banco de dados, com o docker funcionando, o my sql e digite isso: 

a senha é password

CREATE DATABASE geradorcertificado;
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

para o postman use isso:
{
  curl --location 'localhost:3000/diploma' \
--header 'Content-Type: application/json' \
--data '{
  "nome": "Camilly Breitbach Ishida",
  "nacionalidade": "Brasileiro",
  "estado": "São Paulo",
  "data_nascimento": "2005-04-01",
  "documento": "20.119.360-8",
  "data_conclusao": "2026-12-19",
  "curso": "Engenharia de Software",
  "carga_horaria": "500",
  "data_emissao": "2027-01-28", 
  "nome_assinatura": "Diretora Acadêmico",
  "cargo": "Maria Pereira"


ou

curl --location 'localhost:3000/diploma' \
--header 'Content-Type: application/json' \
--data '}'\''
  "nome": "Nikolas De Oliveira Paspaltzis",
  "nacionalidade": "Brasileiro",
  "estado": "São Paulo",
  "data_nascimento": "2001-04-27",
  "documento": "16.519.320-7",
  "data_conclusao": "2025-12-15",
  "curso": "Sistemas de Informação",
  "carga_horaria": "400",
  "data_emissao": "2026-01-20", 
  "nome_assinatura": "Diretora Acadêmico",
  "cargo": "Maria Pereira"
}'

precisa rodar na api o codigo node index.js e o worker rodar o codigo index.js em seus proprios terminais

