


export interface IKafkaProducer {
    publishMessages(topic: string, messages: string) : Promise<void>;
}