import fs from 'fs';
import path from 'path';
import { operationFailed } from '../utils/consoleMessages.js';

const rn = async (directory, args) => {
  if (!args[0] || !args[1]) {
    operationFailed();
    return;
  }
  const oldPath = path.isAbsolute(args[0]) ? args[0] : path.resolve(directory, args[0]);
  const newPath = path.resolve(path.parse(oldPath).dir, args[1])
    fs.rename(oldPath, path.resolve(oldPath, newPath), (error) => {
      if (error) {
        console.log(error);
        operationFailed();
        }
    });
}

export default rn;