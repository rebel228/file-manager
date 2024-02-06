import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { operationFailed } from '../utils/consoleMessages.js';

const os = (args) => {
  const name = args[0] || '';

  if (name[0] !== '-' || name[1] !== '-') {
    operationFailed();
    return;
  }

  const command = name.slice(2);

  switch (command) {
    case 'EOL':  {
      console.log(EOL);
      return;
    }
    case 'cpus': {
      console.log(cpus());
      return;
    }
    case 'homedir': {
      console.log(homedir());
      return;
    }
    case 'username': {
      console.log(userInfo().username);
      return;
    }
    case 'architecture': {
      console.log(arch());
      return;
    }
    default: operationFailed();
  }
}

export default os;