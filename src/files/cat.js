import fs from 'fs';
import path from 'path';
import { operationFailed } from '../utils/consoleMessages.js';

const cat = (directory, args) => {
  const filePath = path.isAbsolute(arg[0]) ? args[0] : path.resolve(directory, args[0]);
  const stream = fs.createReadStream(filePath, 'utf-8');
  let data = '';

  stream.on('data', (chunk) => data += chunk);
  stream.on('end', () => console.log(data));
  stream.on('error', () => operationFailed());
}

export default cat;