import { controller, httpGet, httpPost, httpPut, interfaces, requestBody, requestParam, response } from "inversify-express-utils";
import * as express from "express";
import { ICosmosDBRepository } from "../../../infrastructure/data_access/abstract_repository/abstract_repository";
import { inject } from "inversify";
import { TYPES } from "../../../constants";

@controller("/api/order")
export class OrderController implements interfaces.Controller {

    private readonly _orderRepository: ICosmosDBRepository;
    constructor(@inject(TYPES.OrderRepository) orderRepository: ICosmosDBRepository) {
        this._orderRepository = orderRepository;
    }

    @httpGet("/")
    public async get(@response() res: express.Response) {
        try {
            const result = await this._orderRepository.getAll();
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.status(500);
            res.send("Error in Fetching records");
        }

    }

    @httpPost("/")
    public async create(@requestBody() asset: any, @response() res: express.Response) {

        try {
            const result = await this._orderRepository.add(asset);
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.status(500);
            res.send("Error in Saving record");
        }

    }

    @httpGet("/:orderId")
    public async getOne(@requestParam("orderId") orderId: string,@response() res: express.Response) {
        try {
            const result = await this._orderRepository.getOne(orderId);
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.status(500);
            res.send("Error in Fetching record");
        }

    }

    @httpPut("/")
    public async update(@requestBody() document: any, @response() res: express.Response) {

        try {
            console.log("request for update", document);
            const result = await this._orderRepository.replaceOne(document.orderId,document,document.city);
            console.log("cosmosDB response", result);
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.status(500);
            res.send("Error in Updating record");
        }

    }
}