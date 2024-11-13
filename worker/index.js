const amqp = require("amqplib");
const { generatePDF, savePDF } = require("./pdf");

const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "diploma_queue";

async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log("Gerar diploma para:", data.nome);

        try {
          const pdf = await generatePDF(data);

          const fileName = `diploma_${data.id}.pdf`;
          await savePDF(pdf, fileName);

          console.log(`PDF salvo com sucesso: ${fileName}`);

          channel.ack(msg);
        } catch (error) {
          console.error("Erro ao gerar diploma:", error);
          channel.ack(msg);
        }
      }
    });
  } catch (error) {
    console.error("Erro ao iniciar o consumidor:", error);
  }
}

startConsumer();
