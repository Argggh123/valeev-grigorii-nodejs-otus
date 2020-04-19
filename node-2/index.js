const path = require('path');
const fs = require('fs');
const yargs = require('yargs');

function newDir(dir) {
  return new Promise((resolve, reject) => {
    fs.lstat(dir, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
}

function access(dirName) {
  return new Promise((resolve, reject) => {
    fs.access(dirName, (err) => {
      if (err) {
        reject(err.message);
      }
      resolve();
    });
  });
}

function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, {}, (err, filesArr) => {
      if (err) {
        reject(err.message);
      }
      resolve(filesArr);
    });
  });
}

async function tree(level, stringPath, depth) {
  const normalizedPath = path.normalize(stringPath);

  if (level === depth) {
    return;
  }

  try {
    if (!level) {
      console.log(`\u2520${'\u2501'.repeat(2)} ${path.parse(normalizedPath).base}`);
    }

    const isAccessed = await access(normalizedPath);
    if (!isAccessed) {
      new Error('Access denied');
    }

    const files = await readDir(normalizedPath);

    for (const file in files) {
      const next = path.join(normalizedPath, files[file]);
      const nextDir = await newDir(next);

      if (nextDir.isDirectory()) {
        console.log(`\u2520${'\u2501'.repeat(2 * level + 1)} ${path.parse(next).base}`);

        await tree(level + 1, next, depth);
      } else {
        console.log(`\u2503${' '.repeat(level * 2)}\u2515\u2501 ${files[file]}`);
      }
    }
  } catch (e) {
    throw e;
  }

  return level;
}

function valideteArgs() {
  const args = yargs(process.argv).parse();

  if (typeof args.path === 'string' && typeof args.depth === 'number') {
    return tree(0, args.path, args.depth);
  }
  if (typeof args.path !== 'string') {
    throw new Error('Должен быть укаазан путь до папки');
  }

  if (typeof args.depth !== 'number') {
    throw new Error('Должна быть указана глубина показа');
  }
}

valideteArgs();
