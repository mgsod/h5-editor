import { Request, Response } from "express";

const os = require("os");
const { port } = require("../config");
const router = require("express").Router();
const product = require("./document");
router.use("/document", product);

function getIpAddress() {
  const interfaces = os.networkInterfaces();

  for (const dev in interfaces) {
    const iface = interfaces[dev];

    for (let i = 0; i < iface.length; i++) {
      const { family, address, internal } = iface[i];

      if (family === "IPv4" && address !== "127.0.0.1" && !internal) {
        return address;
      }
    }
  }
}

router.get("/host", (req: Request, res: Response) => {
  res.json({
    code: 200,
    data: `${getIpAddress()}:${port}`,
  });
});
module.exports = router;
