import { Request, Response } from "express";

const fileUploader = require("../middleware/fileUploader")();
const router = require("express").Router();
router.post(
  "/",
  fileUploader.single("singleFile"),
  (req: Request, res: Response) => {
    res.json({
      code: 200,
      message: "上传成功",
      data: `/static/img/${(req.file as Express.Multer.File).filename}`,
    });
  }
);
module.exports = router;
