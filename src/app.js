import path from 'path';
import process from 'process';
import { access, constants } from 'fs/promises';
import up from './navigation/up.js';
import cd from './navigation/cd.js';

const { argv, stdin, stdout } = process;
const { sep } = path;

const username = argv[2].split('=')[1];
let directory = path.resolve(sep);


const invalidInput = () => console.log('Invalid input');

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
      const newDir = cd(directory, args);
      directory = newDir;
      console.log(`You are currently in ${directory}`);
      return;
    }

    default: console.log('Invalid input');
  }
});

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

process.on('SIGINT', () => process.exit());