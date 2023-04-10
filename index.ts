import express, { Express, Request, Response } from "express";
import { ApiController } from "./controllers/index.js";


const app: Express = express();
const port = 8000;

const router = express.Router()

app.get("/pagination/:pageid", ApiController.sendDataFromPage);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
