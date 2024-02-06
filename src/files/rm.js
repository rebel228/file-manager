import path from 'path';
import fs from 'fs/promises';
import { operationFailed } from '../utils/consoleMessages.js';

const rm = async (directory, args) => {
  const name = args[0] || '';
  const itemName = path.isAbsolute(name) ? name : path.resolve(directory, name);
  const itemData = await fs.readdir(directory, 'utf-8');
  const item = itemData.find((value) => value === name);

  if (item) {
    await fs.rm(itemName);
  } else {
    operationFailed();
  };
}

export default rm;