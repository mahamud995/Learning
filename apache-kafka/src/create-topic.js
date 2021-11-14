const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
});

const topicName = "test-topic-1";

const process = async () => {
  const admin = kafka.admin();
  await admin.connect();

  //bin/windows/kafka-topics.bat  --bootstrap-server localhost:9092,localhost:9093,localhost:9094
  // --create --replication-factor 3 --partitions 5 --topic test-topic-1  (partitions are spread across three brokers)
  await admin.createTopics({
    topics: [
      {
        topic: topicName,
        numPartitions: 5,
        replicationFactor: 3,
      },
    ],
  });


  await admin.disconnect();

};

process().then(() => console.log('done'));