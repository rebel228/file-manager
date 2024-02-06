import zlib from 'zlib';
import fs from 'fs';
import fsPromises from 'fs/promises'
import path from 'path';
import { operationFailed } from '../utils/consoleMessages.js';
import { error } from 'console';

const compress = async (directory, args, decompress = false) => {
  if (!args[0] || !args[1]) {
    operationFailed();
    return;
  }
  const readName = path.isAbsolute(args[0]) ? args[0] : path.resolve(directory, args[0]);
  const writeName = path.isAbsolute(args[1]) ? args[1] : path.resolve(directory, args[1]);

  const folderData = await fsPromises.readdir(directory, 'utf-8');
  const item = folderData.find((value) => value === path.parse(readName).base);

  if (!item ||
    (await fsPromises.stat(path.resolve(directory, item))).isDirectory() ||
    !fs.existsSync(path.parse(writeName).dir)
    ) {
    operationFailed();
    return;
  }

  const readStream = fs.createReadStream(readName);
  const writeStream = fs.createWriteStream(writeName);
  
  try {
    const brotli = decompress ? zlib.createBrotliDecompress() : zlib.createBrotliCompress();

    readStream.pipe(brotli).pipe(writeStream);
  }

  catch {
    operationFailed();
    console.log(error);
  }

}

export default compress;