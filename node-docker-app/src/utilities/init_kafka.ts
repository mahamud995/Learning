import { Kafka, logLevel } from "kafkajs";



export async function initApacheKafka() {
    const kafka = new Kafka({
        clientId: "my-app",
        brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
        logLevel : logLevel.DEBUG
      });
      return kafka;
}