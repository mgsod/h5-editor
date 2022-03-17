export {};
const router = require("express").Router();
const document = require("./document");
const uploader = require("./upload");
router.use("/document", document);
router.use("/upload", uploader);

module.exports = router;
