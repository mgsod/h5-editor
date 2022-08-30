import * as fs from 'fs';
import * as path from 'path';
import config from '../config';

const { dataPath } = config;
export const writeImgByBase64 = function (
  _path: string,
  base64: string,
  name: number | string = Date.now()
) {
  const pwd = path.join(dataPath, 'static/', _path);
  const filepath = path.join(pwd, `${name}.png`);
  base64 = base64.replace(/^data:image\/\w+;base64,/, '');
  const dataBuffer = Buffer.from(base64, 'base64');
  return new Promise((resolve, reject) => {
    fs.mkdir(pwd, { recursive: true }, () => {
      fs.writeFile(filepath, dataBuffer, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(`/static/${_path}/${name}.png`);
        }
      });
    });
  });
};
