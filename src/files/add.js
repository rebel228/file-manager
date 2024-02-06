import fs from 'fs/promises';
import path from 'path';
import { operationFailed } from '../utils/consoleMessages.js';

const add = (directory, args) => {
  const fileName = args[0];

  try {
    fs.appendFile(path.resolve(directory, fileName), '');
  } catch (error) {
    operationFailed();
  }
};

export default add;
