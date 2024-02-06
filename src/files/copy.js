import fs from 'fs';
import path from 'path';
import { operationFailed } from '../utils/consoleMessages.js';

const cp = (directory, args) => {
  const oldPath = path.isAbsolute(args[0]) ? args[0] : path.resolve(directory, args[0]);
  const newPath = path.resolve(path.parse(oldPath).dir, args[1])

  try {
    const readStream = fs.createReadStream(oldPath, 'utf8');
    const writeStream = fs.createWriteStream(newPath, 'utf8');
    
    readStream.pipe(writeStream);
  }
  catch(error) {
    operationFailed();
    console.log(error);
  }
}


export default cp;