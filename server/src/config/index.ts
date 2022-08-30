import * as path from 'path';
export default {
  port: process.env.NODE_ENV === 'development' ? 3000 : 5555,
  dataPath: path.join(__dirname, '../../', 'data'),
};
