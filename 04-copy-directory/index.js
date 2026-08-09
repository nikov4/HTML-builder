const fs = require('node:fs');
const path = require('node:path');
const { join } = require('node:path');
const { readdir, mkdir, rm, copyFile } = require('fs/promises');

const dir = path.resolve(__dirname, 'files');
const dirCopy = path.resolve(__dirname, 'files-copy');

async function copyDir() {
  try {
    await rm(dirCopy, { recursive: true, force: true });
    await mkdir(dirCopy, { recursive: true });
    const files = await readdir(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      const fullPathCopy = join(dirCopy, file);
      await copyFile(fullPath, fullPathCopy);
    }
  } catch (err) {
    console.error('Error copy directory:', err);
  }
}

copyDir();
