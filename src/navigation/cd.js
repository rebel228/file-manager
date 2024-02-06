import path from 'path';
import fs from 'fs/promises';

const cd = async (directory, args) => {
  const name = args[0] || '';
  const folderName = path.isAbsolute(name) ? name : path.resolve(directory, name);
  const folderData = await fs.readdir(directory, 'utf-8');
  console.log(folderData, folderName);
  const item = folderData.find((value) => value === name);
  console.log(item);
  if (item && (await fs.stat(path.resolve(directory, item))).isDirectory()) {
    return folderName;
  } else return directory;
}

export default cd;