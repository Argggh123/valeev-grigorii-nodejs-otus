const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { promisify } = require('util');

async function showJsonTree(args: string[]) {
  const { filePath } = yargs.parse(args);

  if (!filePath) {
    throw new Error('must be --file option');
  }

  const { dir, root, ext } = path.parse(filePath);

  if (!dir && !root) {
    throw new Error('path must be absolute');
  }

  if (ext !== '.json') {
    throw new Error('file must be .json type');
  }

  try {
    const file = await promisify(fs.readFile)(filePath, { encoding: 'utf-8' });
    const fileObj = JSON.parse(file);
  } catch (e) {
    throw new Error(e);
  }
}

showJsonTree(process.argv);
