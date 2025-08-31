const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out/_next/static'); // chemin exporté
const swFile = path.join(__dirname, '../public/sw-assets.json'); // output JSON pour SW

function getFilesRecursively(dir, baseUrl = '/_next/static') {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const relativeUrl = path.join(baseUrl, file).replace(/\\/g, '/');
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, relativeUrl));
    } else {
      results.push(relativeUrl);
    }
  });
  return results;
}

const files = getFilesRecursively(outDir);

// Sauvegarde dans un JSON que le SW peut lire
fs.writeFileSync(swFile, JSON.stringify(files, null, 2));
console.log('SW assets generated:', files.length, 'files');
