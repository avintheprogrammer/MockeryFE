/* eslint-disable import/prefer-default-export, consistent-return */
import fs from 'fs';

export function getFilePaths({ directory }) {
  return fs.readdirSync(directory).reduce((resolved, path) => {
    const location = `${directory}${path}`;
    const isDirectory = fs.lstatSync(location).isDirectory();

    if (isDirectory) {
      const filesInDirectory = getFilePaths({ directory: `${location}/` });
      const relativePaths = filesInDirectory.map(name => `${path}/${name}`);
      return resolved.concat(relativePaths);
    }

    resolved.push(path);
    return resolved;
  }, []);
}
