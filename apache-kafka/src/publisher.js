const { Kafka , logLevel } = require("kafkajs");
const Chance = require("chance");

const chance = new Chance();

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
  logLevel : logLevel.DEBUG
});

const topicName = "test-topic-1";

const producer = kafka.producer();

const produceMessages = async () => {
  const value = chance.country();
  console.log(value);

  try {
    await producer.send({
      topic: topicName,
      messages: [
        {
          value,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const processProducer = async () => {
  // Producing
  await producer.connect();
  setInterval(produceMessages, 1000);
};

module.exports = processProducer;

// run().catch(console.error);
