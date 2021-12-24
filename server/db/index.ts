const path = require("path");

const Datastore = require("nedb-promises");
const dataBase = Datastore.create(path.resolve("./server/db/document.db"));

module.exports = dataBase;
