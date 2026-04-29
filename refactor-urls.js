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
    // Replace hardcoded localhost:5000 with process.env.NEXT_PUBLIC_API_URL fallback
    // Usually it's in a fetch('http://localhost:5000/api/...')
    // We will replace 'http://localhost:5000' with `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`
    // Note: If it's inside single quotes like 'http://localhost:5000...', we need to change it to backticks.
    
    // Simple regex to find string literals starting with http://localhost:5000
    const regex = /(['"])http:\/\/localhost:5000(.*?)(\1)/g;
    if (regex.test(content)) {
        content = content.replace(regex, '`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}$2`');
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
        console.log(`Updated: ${file}`);
    }
});

console.log(`Successfully updated ${changedFiles} files.`);
