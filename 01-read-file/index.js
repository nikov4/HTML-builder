const fs = require('fs');
const path = require('path');
txtFile = path.resolve(__dirname, 'text.txt');
const readable = new fs.ReadStream(txtFile);
readable.setEncoding('UTF-8');
const { stdin, stdout } = require('node:process');
readable.pipe(stdout);