import { Kafka, Message } from "kafkajs";
import { inject, injectable } from "inversify";
import { IKafkaProducer } from "./producer_abstract";
import { TYPES } from "../../../constants";


@injectable()
export class KafkaProducer implements IKafkaProducer {

    private readonly _kafka: Kafka;

    constructor(@inject(TYPES.kafkaInstance) kafka: Kafka) {
        this._kafka = kafka;
    }
    async publishMessages(topicName: string, message: string): Promise<void> {
        try {
            const producer = this._kafka.producer();

            await producer.send({
                topic: topicName,
                messages: [
                    {
                        value: message,
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
    }
}