import { Response, Request, NextFunction } from "express";

const path = require("path");
const express = require("express");
const app = express();
const routes = require("./route/index");
const bodyParser = require("body-parser");
require("express-async-errors");
app.all("*", function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // res.header("Access-Control-Allow-Origin", '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method === "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});
app.use("/static", express.static(path.resolve("./server/static")));
app.use(bodyParser.json({ limit: "50mb" }));
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
