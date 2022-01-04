import { Container, CosmosClient, Database } from "@azure/cosmos";
import { TYPES } from  "../../../constants";
import { inject, injectable } from "inversify";
import { ICosmosDBRepository } from "../abstract_repository/abstract_repository";

@injectable()
export class OrderRepository implements ICosmosDBRepository {

    private readonly _cosmosClient: CosmosClient;
    private readonly _databaseId : string;
    private readonly _collectionId : string;
    public  _database : Database;
    public _collection : Container ;

    constructor(@inject(TYPES.CosmosClient)cosmosClient: CosmosClient) {
        this._cosmosClient = cosmosClient;
        this._databaseId = "learning";
        this._collectionId = "order"
        console.debug("Get Database");
        this._database =  this._cosmosClient.database(this._databaseId);
        console.debug("Get Collection");
        this._collection = this._database.container(this._collectionId);
      
    }


    async getAll(): Promise<any> {
        console.log("Get all records");
        const orders = this._collection?.items.query("SELECT * from o").fetchAll();
        return orders;
    }
    async getOne(orderId: string): Promise<any | null> {
        console.debug('Getting an item from the database');
        
            const querySpec = {
              query: "SELECT * FROM o WHERE o.orderId=@orderId",
              parameters: [
                {
                  name: "@orderId",
                  value: Number(orderId)
                }
              ]
            };
        const result = await this._collection.items.query(querySpec).fetchAll();
        console.log("get result", result?.resources);
        return result?.resources
    }

    async add(item: any): Promise<any> {
        const response = await this._collection?.items.create(item);
        return response?.resource;
    }
    addMany(documents: any[]): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    async replaceOne(orderId: any, document: any , partitionKey: string): Promise<any> {
        const docs = await this.getOne(orderId);
        const doc = docs[0];
        console.debug("doc", doc);
        doc.customerDetails = document.customerDetails;
        console.debug("updated doc", doc);
        const response = await this._collection?.item(doc.id,document.city).replace(doc);

        return response?.resource;
    }
}