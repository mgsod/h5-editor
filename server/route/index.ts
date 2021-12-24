const router = require("express").Router();
const product = require("./document");
router.use("/document", product);

module.exports = router;
