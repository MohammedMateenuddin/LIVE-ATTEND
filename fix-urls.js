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
    
    // Regex to find any variation of the mess I created
    // It looks for things like '${process.env.NEXT_PUBLIC_API_URL || ...}/api/...'
    // or `${process.env.NEXT_PUBLIC_API_URL || ...}/api/...`
    // We want to normalize it to: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/...`
    
    const regex = /(['"`])\$\{process\.env\.NEXT_PUBLIC_API_URL.*?http:\/\/localhost:5000.*?\}\/?(.*?)\1/g;
    
    if (regex.test(content)) {
        const newContent = content.replace(regex, '`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/$2`');
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            changedFiles++;
            console.log(`Fixed: ${file}`);
        }
    }
});

console.log(`Successfully fixed ${changedFiles} files.`);
