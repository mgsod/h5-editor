import { NextFunction, Request, Response } from "express";

const dataBase = require("../model");
const route = require("express").Router();

route.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data = await dataBase.findOne({ _id: id });
  if (!data) return next(new Error("未查询到此文档"));
  res.render("index", {
    pages: JSON.stringify(data.content.pages),
    name: data.name,
  });
});

module.exports = route;
