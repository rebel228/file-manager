import fs from 'fs/promises';
import path from 'path';

import { operationFailed } from '../utils/consoleMessages.js';

export async function ls(directory) {
  const result = [];
  const folderData = await fs.readdir(directory);
  try {
    for (let i = 0; i < folderData.length; i += 1) {
      const item = folderData[i];
      const isDir = (
        await fs.stat(path.resolve(directory, item))
      ).isDirectory();
      result.push({
        Name: item,
        Type: isDir ? 'folder' : 'file',
      });
    }
    console.table(result);
  } catch (error) {
    operationFailed();
    console.log(error);
  }
}

export default ls;
