import { TYPES } from "../../constants";
import { Container } from "inversify";
import { Kafka } from "kafkajs";


export async function consumer(container: Container) {
    try {
        const kafka = container.get<Kafka>(TYPES.kafkaInstance);
        const consumer = kafka.consumer({ groupId: "consumer-group-1" });
        await consumer.connect();

        const topicName = "test-topic-1";
        await consumer.subscribe({ topic: topicName });

        await consumer.run({
            eachMessage: async ({ partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message?.value?.toString(),
                });
            },
        });
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}