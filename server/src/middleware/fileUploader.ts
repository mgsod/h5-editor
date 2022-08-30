import multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import config from '../config';
const uploader = () => {
  return multer({
    storage: multer.diskStorage({
      destination(req, file, cb: (a: any, b: string) => void) {
        const fullPath = `${path.join(config.dataPath, 'static/img')}`;
        const exist = fs.existsSync(fullPath);
        if (!exist) {
          fs.mkdirSync(fullPath, { recursive: true });
        }
        cb(null, fullPath);
      },
      filename(req, file, cb: (a: any, b: string) => void) {
        const hz = file.originalname
          .substring(file.originalname.lastIndexOf('.') + 1)
          .toLowerCase();
        const changedName = new Date().getTime() + '.' + hz;
        cb(null, changedName);
      },
    }),
  });
};
export default uploader;
