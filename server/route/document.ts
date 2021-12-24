import { Request, Response } from "express";
import { DocumentModel } from "../document";

const dataBase = require("../db/index");
const route = require("express").Router();

// 新增
route.post("/", async (req: Request, res: Response) => {
  const { name, content } = req.body as DocumentModel;
  const isExist = await dataBase.findOne({ name });
  if (isExist) {
    return res.json({
      code: 400,
      message: "添加失败，改文档已存在",
    });
  }
  const data = await dataBase.insert({ name, content });
  res.json({
    code: 200,
    message: "添加成功",
    data: { _id: data._id },
  });
});

// 更新
route.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, content } = req.body as DocumentModel;
  await dataBase.update({ _id: id }, { $set: { name, content } });
  res.json({
    code: 200,
    message: "更新成功",
  });
});

// 查询
route.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await dataBase.findOne({ _id: id });
  res.json({
    code: 200,
    message: "查询成功",
    data,
  });
});

route.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await dataBase.remove({ _id: id });
  res.json({
    code: 200,
    message: "删除成功",
  });
});

module.exports = route;
