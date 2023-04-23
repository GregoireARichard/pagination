import express  from "express";
import { ApiService } from "../../services/index.js";
//import { order } from "../../types/api.types";


export default class ApiController{
    public static async sendDataFromPage(req: express.Request, res: express.Response){
        const order = typeof (req.query.order) == 'string' ? req.query.order : ""
        const sortAttr = typeof (req.query.sortAttr) == 'string' ? req.query.sortAttr : ""
        const result =  await ApiService.sendDataFromPage(order, sortAttr)
        res.status(200).json(result).end();
    }
}