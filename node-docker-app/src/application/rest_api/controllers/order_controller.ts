import { controller, httpGet, interfaces, response } from "inversify-express-utils";
import * as express from "express";

@controller("/api/order")
export class OrderController implements interfaces.Controller {

    @httpGet("/")
    public async get(@response() res: express.Response) {
        res.send("Hello World");
    }
}