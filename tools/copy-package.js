const fs = require('fs');
let resizable = fs.readFileSync('package.json').toString();
fs.writeFileSync('dist/package.json', resizable);
