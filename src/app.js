const { argv, stdin, stdout } = process;

const username = argv[2].split('=')[1];

console.log(`Welcome to the File Manager, ${username}!`);

stdin.on('data', async (chunk) => {
  const input = chunk.toString().trimEnd().split(' ');
  const command = input[0];
  const args = input.slice(1);
  console.log(input, command, args)

  switch(command) {
    case 'up': 
    default: console.log('Invalid input');
  }

  if (cmd in commands) {
    await commands[cmd](data);
    blueLog(`You are currently in ${wd}`);
  } else {
    redLog('Invalid input');
  }
});

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

process.on('SIGINT', () => process.exit());