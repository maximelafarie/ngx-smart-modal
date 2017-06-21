const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./dist/package.json').toString());
delete packageJson.devDependencies;
delete packageJson.scripts;
fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));
