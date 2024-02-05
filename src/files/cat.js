import fs from 'fs';
import path from 'path';

const cat = (directory, arg) => {
  const filePath = path.isAbsolute(arg[0]) ? arg[0] : path.resolve(directory, arg[0]);
  const stream = fs.createReadStream(filePath, 'utf-8');
  let data = '';

  stream.on('data', (chunk) => data += chunk);
  stream.on('end', () => console.log(data));
  stream.on('error', () => console.log('Operation failed'));
}

export default cat;