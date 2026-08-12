const fs = require('node:fs');
const path = require('node:path');
const { join, resolve, extname, basename, parse } = require('node:path');
const {
  readdir,
  mkdir,
  rm,
  open,
  unlink,
  copyFile,
  appendFile,
  writeFile,
} = require('fs/promises');

const dir = resolve(__dirname, 'styles');
const dirBundle = resolve(__dirname, 'project-dist');
const fileBundle = join(dirBundle, 'bundle.css');

async function deleteBundle() {
  try {
    await unlink(fileBundle);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error delete file:`, err);
    }
  }
}

async function makeBundle() {
  try {
    // await mkdir(dirBundle, { recursive: true });
    await writeFile(fileBundle, '', 'utf8');
    const files = await readdir(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      const fileExt = extname(file);
      if (fileExt === '.css') {
        const fileContent = fs.createReadStream(filePath);
        await appendFile(fileBundle, fileContent, 'utf8');
        await appendFile(fileBundle, '\n', 'utf8');
      }
    }
  } catch (err) {
    console.error('Error write file:', err);
  }
}

//deleteBundle();
makeBundle();
