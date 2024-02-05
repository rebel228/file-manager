import fs from 'fs';
import path from 'path';
import { operationFailed } from '../utils/consoleMessages.js';

const rn = async (directory, args) => {
  const filePath = path.isAbsolute(args[0]) ? args[0] : path.resolve(directory, args[0]);
  const newFileName = path.resolve(path.parse(filePath).dir, args[1])
    fs.rename(filePath, path.resolve(filePath, newFileName), (error) => {
      if (error) {
        console.log(error);
        operationFailed();
        }
    });
}

export default rn;