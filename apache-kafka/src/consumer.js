const {  Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
});

const consumer = kafka.consumer({ groupId: "consumer-group-1" });
const topicName = "test-topic-1";

const processConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: topicName });

  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

module.exports = processConsumer;
//processConsumer().catch(console.error);
