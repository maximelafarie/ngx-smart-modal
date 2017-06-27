const fs = require('fs');
let resizable = fs.readFileSync('src/lib/package.json').toString();
fs.writeFileSync('src/lib/dist/package.json', resizable);
let readme = fs.readFileSync('README.md').toString();
fs.writeFileSync('src/lib/dist/README.md', readme);
let readme = fs.readFileSync('LICENSE').toString();
fs.writeFileSync('src/lib/dist/LICENSE', readme);
