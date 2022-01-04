import { TYPES } from "./constants";
// import { KafkaProducer, IKafkaProducer } from "infrastructure/apache_kafka.ts";
import { ContainerModule } from "inversify";
import { OrderRepository } from "./infrastructure/data_access/cosmos_repositories/order_repositories";
import { ICosmosDBRepository } from "./infrastructure/data_access/abstract_repository/abstract_repository";


export const containerModule = new ContainerModule((bind) => {
  //  bind<IKafkaProducer>(TYPES.KafkaProducer).to(KafkaProducer);

  bind<ICosmosDBRepository>(TYPES.OrderRepository).to(OrderRepository)

})