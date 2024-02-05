import path from 'path';

const cd = (directory, args) => {
  const destPath = args[0];

  return path.isAbsolute(destPath) ? destPath : path.resolve(directory, destPath);
}

export default cd;