import crypto from 'crypto';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { operationFailed } from '../utils/consoleMessages.js';
import path from 'path';

const hash = async (directory, args) => {
  const name = args[0] || '';
  const fileName = path.isAbsolute(name) ? name : path.resolve(directory, name);
  const folderData = await fsPromises.readdir(directory, 'utf-8');
  const item = folderData.find((value) => value === name);

  if (
    !item ||
    (await fsPromises.stat(path.resolve(directory, item))).isDirectory()
  ) {
    operationFailed();
    return;
  }

  const readStream = fs.createReadStream(fileName);
  const hash = crypto.createHash('sha1');
  hash.setEncoding('hex');

  readStream.on('end', () => {
    hash.end();
    console.log(hash.read());
  });
  readStream.pipe(hash);
};

export default hash;
