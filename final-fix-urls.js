const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));

let changedFiles = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // The previous script created a mess like `${...}/`}/api/...`
    // We need to fix the extra backtick and brace
    const mess = /\}\/`\}\/api/g;
    if (mess.test(content)) {
        content = content.replace(mess, '}/api');
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
        console.log(`Fixed: ${file}`);
    }
});

console.log(`Successfully fixed ${changedFiles} files.`);
