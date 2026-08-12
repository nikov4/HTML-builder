const fs = require('node:fs');
const { join, resolve, extname, basename, parse } = require('node:path');
const txtFile = resolve(__dirname, 'text.txt');
const { access, appendFile, writeFile } = require('fs/promises');

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

// intro message
process.stdout.write(
  'Please, type some words here\nPress \"Ctrl+C\" or type \"exit\" to exit\n',
);

// check file exist
async function checkFile() {
  try {
    await access(txtFile);
  } catch {
    writeFile(txtFile, '', 'utf8');
  }
}
checkFile();

// write input
rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  } else {
    appendFile(txtFile, input, 'utf8');
    appendFile(txtFile, '\n', 'utf8');
  }
});

// farewell message
process.on('exit', () => process.stdout.write('\nSee you next time!'));
