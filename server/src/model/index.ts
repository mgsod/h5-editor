import * as path from 'path';
import config from '../config';
const Datastore = require('nedb-promises');
const dataBase = Datastore.create({
  filename: path.join(config.dataPath, '/db/document.db'),
  timestampData: true,
});

export default dataBase;
