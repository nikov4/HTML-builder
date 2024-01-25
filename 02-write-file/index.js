const fs = require('fs');
const path = require('path');
const txtFile = path.resolve(__dirname, 'text.txt');
const writable = new fs.WriteStream(txtFile);
writable.setDefaultEncoding('UTF-8');

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

process.stdout.write('Please, type some word here\n');

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  } else {
    writable.write(input);
    writable.write('\n');
  }
});
process.on('exit', () => process.stdout.write('\nSee you next time!'));
