# Passo a Passo de Configuração e Execução
## Instalar dependências na pasta api:
* Abra o terminal dentro da pasta api.
* Execute o comando:
 ```
  npm install
```

## Instalar dependências na pasta worker

* Abra outro terminal (ou na mesma janela, mas em outra aba) dentro da pasta worker.
* Execute o comando:
```
npm install
```

## Configurar o banco de dados MySQL via Docker

* Certifique-se de que o Docker esteja em execução.
* Acesse o MySQL no terminal (ou via ferramenta de gerenciamento de banco de dados) e utilize a senha password para autenticação.
* Crie e selecione o banco de dados executando:

```
CREATE DATABASE geradorcertificado;
USE geradorcertificado;
```
* Crie a tabela diplomas caso não exista:

```
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

```
## Executar a API e o Worker

* Na pasta api, execute:

```
node index.js
```
(Certifique-se de que o arquivo principal seja mesmo o index.js).

* Na pasta worker, execute:
```
node index.js
```
(Também confirme o nome do arquivo principal na pasta do worker).

## Fazer requisições via Postman (ou via curl no terminal)

* A URL base para envio das requisições à API é http://localhost:3000.
* Exemplo de criação de um diploma utilizando curl:

```
curl --location 'http://localhost:3000/diploma' \
--header 'Content-Type: application/json' \
--data '{
  "nome": "Camilly Paspaltzis",
  "nacionalidade": "Brasileiro",
  "estado": "São Paulo",
  "data_nascimento": "2000-01-09",
  "documento": "20.119.360-8",
  "data_conclusao": "2026-12-19",
  "curso": "Engenharia de Software",
  "carga_horaria": "500",
  "data_emissao": "2027-01-28", 
  "nome_assinatura": "Diretora Acadêmico",
  "cargo": "Maria Pereira"
}'
```
Ou outro exemplo:
```
curl --location 'http://localhost:3000/diploma' \
--header 'Content-Type: application/json' \
--data '{
  "nome": "Nikolas Paspaltzis",
  "nacionalidade": "Brasileiro",
  "estado": "São Paulo",
  "data_nascimento": "1997-11-05",
  "documento": "16.519.320-7",
  "data_conclusao": "2025-12-15",
  "curso": "Sistemas de Informação",
  "carga_horaria": "400",
  "data_emissao": "2026-01-20", 
  "nome_assinatura": "Diretora Acadêmico",
  "cargo": "Maria Pereira"
}'
```
