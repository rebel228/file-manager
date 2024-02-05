
import path from 'path';
const { sep } = path;

const up = (directory) => {
  return directory === path.resolve(sep) ?  directory : path.resolve(directory, '..');
}

export default up;