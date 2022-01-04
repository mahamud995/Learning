import { Container, ContainerModule } from "inversify";
import * as express from "express"
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import { TYPES } from "../../constants";
import "../../application/rest_api/controllers"
import { initApacheKafka } from "../../utilities/init_kafka";
import { Kafka } from "kafkajs";
import { consumer } from "../../application/events/consumer";
import { getCosmosDbConnection } from "../../utilities/init_cosmos_db_connection";
import { CosmosClient } from "@azure/cosmos";


export async function bootstrap(container: Container,appPort : number, ...modules: ContainerModule[]){

    if(container.isBound(TYPES.App)=== false) {
        container.load(...modules);

        try {

            // console.info("Iitialize apache kafka");

            // const kafkaInstance = await initApacheKafka();
            // container
            // .bind<Kafka>(TYPES.kafkaInstance)
            // .toDynamicValue(() => {
            //     return kafkaInstance;
            // })
            // .inSingletonScope();
            // console.info("apache kafka Initialized");


            // await consumer(container);

            console.info("Initialize cosmos DB connection");

            const cosmosDBClient = await getCosmosDbConnection("AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==");
            
            container
            .bind<CosmosClient>(TYPES.CosmosClient)
            .toDynamicValue(() => {
                return cosmosDBClient;
            })
            .inSingletonScope();

            const server = new InversifyExpressServer(container,null, {
                rootPath : "/node"
            })
            console.info("Initializing express server");

            server.setConfig((app) => {
                // disable default cache
                app.set("etag", false);

                                // configure requests body parsing
                                app.use(bodyParser.urlencoded({ extended: true }));
                                app.use(bodyParser.json());

            });

            const app = server.build();

            console.info(`Application listening on port ${appPort}...`);
            app.listen(appPort);
            container.bind<express.Application>(TYPES.App).toConstantValue(app);
            return app;
        }
        catch(err){
            console.info("err", JSON.stringify(err));
            console.error(err);
        }
    }
    return container.get<express.Application>(TYPES.App);
}