const fs = require('node:fs');
const { join, resolve, extname, basename, parse } = require('node:path');
const {
  readdir,
  mkdir,
  rm,
  open,
  unlink,
  copyFile,
  appendFile,
  readFile,
  writeFile,
} = require('fs/promises');

const dir = resolve(__dirname, 'assets');
const dirComponents = resolve(__dirname, 'components');
const dirStyles = resolve(__dirname, 'styles');
const dirBundle = resolve(__dirname, 'project-dist');
const fileTemplate = join(__dirname, 'template.html');
const dirAssets = join(dirBundle, 'assets');
const fileCss = join(dirBundle, 'style.css');
const fileHtml = join(dirBundle, 'index.html');

// copy assets
async function copyAssets() {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const dirFrom = join(dir, entry.name);
        const dirTo = join(dirAssets, entry.name);
        copyFiles(dirFrom, dirTo);
      }
    }
  } catch (err) {
    console.error('Error read assets directory:', err);
  }
}

// merge css into a bundle
async function makeBundleCss() {
  try {
    await mkdir(dirBundle, { recursive: true });
    await writeFile(fileCss, '', 'utf8');
    const files = await readdir(dirStyles);
    for (const file of files) {
      const filePath = join(dirStyles, file);
      const fileExt = extname(file);
      if (fileExt === '.css') {
        const fileContent = fs.createReadStream(filePath);
        await appendFile(fileCss, fileContent, 'utf8');
        await appendFile(fileCss, '\n', 'utf8');
      }
    }
  } catch (err) {
    console.error('Error make css bundle:', err);
  }
}

// make html from components
async function makeBundleHtml() {
  try {
    await mkdir(dirBundle, { recursive: true });
    await writeFile(fileHtml, '', 'utf8');

    // read template
    let template = '';
    async function readTemplate() {
      template = await readFile(fileTemplate, 'utf8');
    }
    readTemplate();

    // read components
    const files = await readdir(dirComponents);
    for (const file of files) {
      const filePath = join(dirComponents, file);
      let fileExt = extname(file);
      const fileName = basename(file, fileExt);
      fileExt = fileExt.replace('.', '');
      if (fileExt === 'html') {
        // const fileContent = fs.createReadStream(filePath);
        const fileContent = await readFile(filePath, 'utf8');
        // replace template
        template = template.replace(`{{${fileName}}}`, fileContent);
        await writeFile(fileHtml, template, 'utf8');
      }
    }
  } catch (err) {
    console.error('Error make html file:', err);
  }
}

// copy files in folders
async function copyFiles(dirFrom, dirTo) {
  try {
    await mkdir(dirTo, { recursive: true });
    const entries = await readdir(dirFrom, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const fullPath = join(dirFrom, entry.name);
        const fullPathCopy = join(dirTo, entry.name);
        await copyFile(fullPath, fullPathCopy);
      }
    }
  } catch (err) {
    console.error('Error copy file:', err);
  }
}

makeBundleCss();
makeBundleHtml();
copyAssets();
