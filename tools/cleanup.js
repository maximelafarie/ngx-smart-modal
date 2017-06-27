const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./src/lib/dist/package.json').toString());
delete packageJson.devDependencies;
delete packageJson.scripts;
fs.writeFileSync('./src/lib/dist/package.json', JSON.stringify(packageJson, null, 2));
