const fs = require("fs");
const path = require("path");

exports.writeImgByBase64 = function (
  _path: string,
  base64: string,
  name = Date.now()
) {
  const filepath = path.join(
    process.cwd(),
    "/server/static",
    _path,
    `${name}.png`
  );
  base64 = base64.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = Buffer.from(base64, "base64");
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
