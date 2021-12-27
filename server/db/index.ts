export {};
const path = require("path");

const Datastore = require("nedb-promises");
const dataBase = Datastore.create({
  filename: path.resolve("./server/db/document.db"),
  timestampData: true,
});

module.exports = dataBase;
