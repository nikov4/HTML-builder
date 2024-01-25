const fs = require('fs');
const path = require('path');
//const txtFile = "W:\\Git\\HTML-builder\\01-read-file\\text.txt";
//const thisDir = path.dirname(require.main.filename);
//path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
const thisDir = path.relative("W:\\Git\\HTML-builder", "W:\\Git\\HTML-builder\\01-read-file\\");
const txtFile = thisDir + "\\text.txt";
//console.log(thisDir);
//console.log(txtFile);
const readable = new fs.ReadStream(txtFile);
readable.setEncoding('UTF-8');
/*
readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    //console.log(`${chunk}`);
    //console.log(chunk);
  }
});
*/
const { stdin, stdout } = require('node:process');
readable.pipe(stdout);