const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/import\s+\{\s*Hospital\s*\}\s+from/g, 'import type { Hospital } from');
            content = content.replace(/import\s+\{\s*Hospital\s*,\s*(.*?)\}\s+from/g, 'import type { Hospital, $1 } from');
            fs.writeFileSync(fullPath, content, 'utf8');
        }
    });
}

replaceInDir('c:/Users/dbcks/OneDrive/바탕 화면/Hospital Analystic/src');
