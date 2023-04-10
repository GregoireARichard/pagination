import express  from "express";
import { ApiService } from "../../services/index.js";
import { order } from "../../types/api.types";


export default class ApiController{
    public static async sendDataFromPage(req: express.Request, res: express.Response){
        const page = typeof (req.query.page) == 'string' ? parseInt(req.query.page) : 0
        const limit = typeof (req.query.limit) == 'string' ? parseInt(req.query.limit) : 0
        const order = typeof (req.query.order) == 'string' ? req.query.order : ""
        const sortAttr = typeof (req.query.sortAttr) == 'string' ? req.query.sortAttr : ""
        return ApiService.sendDataFromPage(page, limit, order, sortAttr)

    }
}