const fs = require('node:fs');
const path = require('node:path');
const { readdir, stat } = require('fs/promises');
const { extname, basename, parse } = require('node:path');

const dir = path.resolve(__dirname, 'secret-folder');

async function readDirectory() {
  try {
    const files = await readdir(dir);
    // const files = await fs.promises.readdir(dir);
    console.log(files);
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

async function readDirectoryDetailed() {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fileStat = await stat(`${dir}\\${entry.name}`);
      if (entry.isFile()) {
        // const { name, ext } = parse(entry.name);
        let fileExt = extname(entry.name);
        let fileName = basename(entry.name, fileExt);
        fileExt = fileExt.replace('.', '');
        let fileSize = (fileStat.size / 1024).toFixed(3);
        console.log(fileName, '-', fileExt, '-', `${fileSize}kb`);
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

//readDirectory();
readDirectoryDetailed();
