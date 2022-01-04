export {};
const router = require("express").Router();
const document = require("./document");
router.use("/document", document);
module.exports = router;
