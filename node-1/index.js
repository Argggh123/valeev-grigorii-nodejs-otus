const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

function getJsonTree() {

}

async function showJsonTree() {
  try {
    const file = await promisify(fs.readFile)(
      path.join(__dirname, 'jsonTree.json'),
      { encoding: 'utf-8' },
    );
    const fileObj = JSON.parse(file);
    getJsonTree();
  } catch (e) {
    throw new Error(e);
  }
}

showJsonTree();
