import { CosmosClient } from "@azure/cosmos";

export function getCosmosDbConnection(connectionString: string){

    try{
        const client = new CosmosClient(connectionString);
        console.log("cosmos DB connection established");
        return client;
    }
    catch(err){
        console.error(err);
        throw err;
    }

}