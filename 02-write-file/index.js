const fs = require('fs');
const path = require('path');
txtFile = path.resolve(__dirname, 'text.txt');
const writable = new fs.WriteStream(txtFile);
writable.setDefaultEncoding('UTF-8');

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

process.stdout.write('Please, type some word here');

rl.on('line', (input) => {
  writable.write(input);
  writable.write('\n');
  if (input === 'exit') {
    process.stdout.write('See you next time!');
    rl.close();
  }
});
