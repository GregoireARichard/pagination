import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 8000;
app.get("/", (req: Request, res: Response) => {
  res.send("ts!");
});

app.get("/hi", (req: Request, res: Response) => {
    res.send("Hello!");
  });
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
