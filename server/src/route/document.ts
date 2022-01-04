import { Request, Response } from "express";
import { DocumentModel } from "../document";

const dataBase = require("../model");
const route = require("express").Router();
const writeImgByBase64 = require("../util").writeImgByBase64;
// 新增
route.post("/", async (req: Request, res: Response) => {
  const { name, content, cover } = req.body as DocumentModel;
  const isExist = await dataBase.findOne({ name });
  if (isExist) {
    return res.json({
      code: 400,
      message: "添加失败，改文档已存在",
    });
  }
  const coverPath = await writeImgByBase64("covers", cover);
  const data = await dataBase.insert({ name, content, cover: coverPath });
  res.json({
    code: 200,
    message: "添加成功",
    data: { _id: data._id },
  });
});

// 更新
route.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, content, cover } = req.body as DocumentModel;
  const coverPath = await writeImgByBase64("covers", cover, id);
  await dataBase.update(
    { _id: id },
    { $set: { name, content, cover: coverPath } }
  );
  res.json({
    code: 200,
    message: "更新成功",
  });
});

route.get("/", async (req: Request, res: Response) => {
  const data = await dataBase.find({});
  res.json({
    code: 200,
    message: "查询成功",
    data,
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
