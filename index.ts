import express, { Express, Request, Response } from "express"
import { ApiController } from "./controllers/index.js"
import cors from 'cors'



const app: Express = express()
const port = 8000;
app.use(cors())
const router = express.Router()

app.get("/pagination", ApiController.sendDataFromPage)
app.listen(port, () => {
  console.log(`listening on port ${port}`)
});
