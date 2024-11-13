const express = require("express");
const mysql = require("mysql2");
const amqp = require("amqplib");
const path = require("path");
const { createClient } = require("redis");
const fs = require("fs").promises;

const redisClient = createClient();
redisClient.connect().catch(console.error);
const app = express();

app.use(express.json());

const PORT = 3000;
const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "diploma_queue";

async function sendToQueue(data) {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME);
  await channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)));
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "geradorcertificado",
});

app.post("/diploma", (req, res) => {
  const {
    nome,
    nacionalidade,
    estado,
    data_nascimento,
    documento,
    data_conclusao,
    curso,
    carga_horaria,
    data_emissao,
    nome_assinatura,
    cargo_assinatura,
  } = req.body;

  connection.query(
    `
    INSERT INTO diplomas (
        nome, nacionalidade, estado,
        data_nascimento, documento, data_conclusao, 
        curso, carga_horaria, data_emissao, nome_assinatura, cargo_assinatura
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      nome,
      nacionalidade,
      estado,
      data_nascimento,
      documento,
      data_conclusao,
      curso,
      carga_horaria,
      data_emissao,
      nome_assinatura,
      cargo_assinatura,
    ],
    (err, result) => {
      if (err) throw err;

      const diplomaInfo = {
        id: result.insertId,
        ...req.body,
      };

      sendToQueue(diplomaInfo);

      res.json({
        mensagem: "Diploma gerado com sucesso",
        diploma_id: result.insertId,
      });
    }
  );
});

app.get("/diploma/:id", async (req, res) => {
  const diplomaId = req.params.id;
  const filename = `diploma_${diplomaId}.pdf`;
  const filePath = path.join(__dirname, "..", "worker", filename);
  const cacheKey = `diploma:${diplomaId}`;

  try {
    const cachedPDF = await redisClient.get(cacheKey);

    if (cachedPDF) {
      console.log("Cache hit para diploma:", diplomaId);
      const pdfBuffer = Buffer.from(cachedPDF, "base64");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
      return res.send(pdfBuffer);
    }

    const file = await fs.readFile(filePath);

    await redisClient.set(cacheKey, file.toString("base64"));

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.send(file);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({ error: "Diploma não encontrado" });
    } else {
      console.error("Erro ao ler o arquivo:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
});
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
