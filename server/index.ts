import { Response, Request } from "express";

const express = require("express");
const app = express();
const routes = require("./route/index");
const bodyParser = require("body-parser");
require("express-async-errors");
app.use(bodyParser.json());
app.use("/api", routes);
app.listen(3000, () => {
  console.log(`server run at:http://127.0.0.1:3000`);
});
app.use(function (req: Request, res: Response) {
  res.status(404).send("Sorry can't find that!");
});
app.use(function (err: Error, req: Request, res: Response) {
  res.status(500).send("Something broke!");
});
