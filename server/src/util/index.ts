const fs = require('fs');
const path = require('path');
const os = require('os');
const { port } = require('../config');
exports.writeImgByBase64 = function (
  _path: string,
  base64: string,
  name = Date.now()
) {
  const filepath = path.join(__dirname, '../static/', _path, `${name}.png`);
  base64 = base64.replace(/^data:image\/\w+;base64,/, '');
  const dataBuffer = Buffer.from(base64, 'base64');
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, dataBuffer, (err: Error | null) => {
      if (err) {
        reject(err);
      } else {
        resolve(`/static/${_path}/${name}.png`);
      }
    });
  });
};

exports.getRuntimeHost = function () {
  const interfaces = os.networkInterfaces();
  for (const dev in interfaces) {
    const iface = interfaces[dev];
    for (let i = 0; i < iface.length; i++) {
      const { family, address, internal } = iface[i];
      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        return `http://${address}:${port}`;
      }
    }
  }
};
