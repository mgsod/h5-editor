export {};
const router = require("express").Router();
const document = require("./document");
const host = require("./host");
const preview = require("./preview");
router.use("/document", document);
router.use("/host", host);
router.use("/preview", preview);
module.exports = router;
