import { TYPES } from "./constants";
import { KafkaProducer, IKafkaProducer } from "infrastructure/apache_kafka.ts";
import { ContainerModule } from "inversify";


export const containerModule = new ContainerModule((bind) => {
    bind<IKafkaProducer>(TYPES.KafkaProducer).to(KafkaProducer);

})