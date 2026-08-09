const fs = require('node:fs');
const path = require('node:path');
const { stdout } = require('node:process');
const txtFile = path.resolve(__dirname, 'text.txt');
const readable = fs.createReadStream(txtFile);
readable.setEncoding('UTF-8');
readable.pipe(stdout);
