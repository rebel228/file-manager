import fs from 'fs/promises';
import path from 'path';

export async function ls(directory) {
  const result = [];
  const folderData = await fs.readdir(directory);

  for (let i = 0; i < folderData.length; i += 1) {
    const item = folderData[i];
    const isDir = (await fs.stat(path.resolve(directory, item))).isDirectory();
    result.push({
      Name: item,
      Type: isDir ? 'folder' : 'file'
    })
  }

  console.table(result);
}

export default ls;