import { Response, Request } from "express";

const path = require("path");
const express = require("express");
const app = express();
const Datastore = require("nedb-promises");
const dataBase = Datastore.create(path.resolve("./server/db/product.db"));
const bodyParser = require("body-parser");
require("express-async-errors");
app.use(bodyParser.json());

// 新增
app.post("/product", async (req: Request, res: Response) => {
  const { name, content } = req.body as ProductModel;
  const data = await dataBase.insert({ name, content });
  res.json({
    code: 200,
    message: "添加成功",
    id: data._id,
  });
});

// 更新
app.put("/product/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, content } = req.body as ProductModel;
  await dataBase.update({ _id: id }, { $set: { name, content } });
  res.json({
    code: 200,
    message: "更新成功",
  });
});

// 查询
app.get("/product/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await dataBase.findOne({ _id: id });
  console.log(data);
  res.json({
    code: 200,
    message: "查询成功",
    data,
  });
});

app.delete("/product/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await dataBase.remove({ _id: id });
  res.json({
    code: 200,
    message: "删除成功",
  });
});

app.listen(3000, () => {
  console.log(`server run at:http://127.0.0.1:3000`);
});

app.use(function (err: Error, req: Request, res: Response) {
  res.status(500).send("Something broke!");
});
