export {};
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const uploader = () => {
  return multer({
    storage: multer.diskStorage({
      destination: function (
        req: Request,
        file: Express.Multer.File,
        cb: (a: any, b: string) => void
      ) {
        const fullPath = `${path.join(__dirname, "../static/img")}`;
        const exist = fs.existsSync(fullPath);
        if (!exist) {
          fs.mkdirSync(fullPath);
        }
        cb(null, fullPath);
      },
      filename: function (
        req: Request,
        file: Express.Multer.File,
        cb: (a: any, b: string) => void
      ) {
        const hz = file.originalname
          .substring(file.originalname.lastIndexOf(".") + 1)
          .toLowerCase();
        const changedName = new Date().getTime() + "." + hz;
        cb(null, changedName);
      },
    }),
  });
};
module.exports = uploader;
