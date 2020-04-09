const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

function printArr(item, index, level) {
  const { name, items } = item;
  if (level === 0 && index === 0) {
    console.log(`\u2520${'\u2501'.repeat(2)} ${name}`);
  } else {
    console.log(`\u2503${' '.repeat(level * 2)}\u2515\u2501 ${name}`);
  }

  if (items && items.length) {
    level++;
    items.map((item, index) => {
      printArr(item, index, level);
    });
  }
}

function getJsonTree(obj) {
  const { name, items } = obj;
  let level = 0;

  if (!name) {
    throw new Error('Файл не должен быть пустым');
  }

  console.log(`${name}`);

  if (items && items.length) {
    items.map((item, index) => {
      printArr(item, index, level);
    });
  }
}

async function getJson() {
  try {
    const file = await promisify(fs.readFile)(path.join(__dirname, 'jsonTree.json'));
    const fileObj = JSON.parse(file);
    getJsonTree(fileObj);
  } catch (e) {
    throw new Error(e);
  }
}

getJson();
