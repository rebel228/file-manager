import path from 'path';
import process from 'process';
import { access, constants } from 'fs/promises';
import up from './navigation/up.js';
import cd from './navigation/cd.js';
import ls from './navigation/ls.js';
import cat from './files/cat.js';
import add from './files/add.js';
import rn from './files/rn.js';
import copyMove from './files/copyOrMove.js';
import { homedir } from 'os';

import { invalidInput } from './utils/consoleMessages.js';

const { argv, stdin, stdout } = process;

const username = argv[2].split('=')[1];
let directory = homedir();

const setDirectory = async (value) => {
  try {
    await access(value, constants.F_OK);
    directory = value;
  }
  catch (error) {
    invalidInput();
  }
}

console.log(`Welcome to the File Manager, ${username}!`);

stdin.on('data', async (chunk) => {
  const input = chunk.toString().trimEnd().split(' ');
  const command = input[0];
  const args = input.slice(1);

  switch(command) {
    case 'up': {
      const newDir = up(directory);
      directory = newDir;
      console.log(newDir);
      console.log(`You are currently in ${directory}`);
      return;
    }

    case 'cd': {
      const newDir = await cd(directory, args);
      directory = newDir;
      console.log(`You are currently in ${directory}`);
      return;
    }

    case 'ls': {
      await ls(directory);
      return;
    }

    case 'cat': {
      cat(directory, args);
      return;
    }

    case 'add': {
      add(directory, args);
      return;
    }

    case 'rn': {
      rn(directory, args);
      return;
    }

    case 'cp': {
      copyMove(directory, args);
      return;
    }

    case 'mv': {
      copyMove(directory, args, true);
      return;
    }

    default: console.log('Invalid input');
  }
});

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

process.on('SIGINT', () => process.exit());