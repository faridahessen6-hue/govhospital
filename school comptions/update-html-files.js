const fs = require('fs');
const path = require('path');

// Function to process each HTML file
function updateHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Ensure <head> exists
        const hasHead = content.includes('<head');
        const headCloseIdx = content.indexOf('</head>');

        // 1) Ensure Bootstrap Icons CSS is present (needed by header/footer icons)
        const iconsLink = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">';
        if (hasHead && !content.includes('bootstrap-icons')) {
            if (headCloseIdx !== -1) {
                content = content.slice(0, headCloseIdx) + `\n    ${iconsLink}\n` + content.slice(headCloseIdx);
            }
        }

        // 2) Ensure <body ... data-page="..."> attribute exists
        if (!content.includes('data-page=')) {
            const bodyTagIdx = content.indexOf('<body');
            if (bodyTagIdx !== -1) {
                const bodyOpenEnd = content.indexOf('>', bodyTagIdx);
                if (bodyOpenEnd !== -1) {
                    const pageName = path.basename(filePath, '.html');
                    const before = content.slice(0, bodyOpenEnd);
                    const after = content.slice(bodyOpenEnd);
                    if (!/data-page\s*=/.test(before)) {
                        content = before.replace('<body', `<body data-page="${pageName}"`) + after;
                    }
                }
            }
        }
        
        // 3) Ensure header container exists after <body>
        if (!content.includes('<header id="header"></header>')) {
            const bodyTag = content.indexOf('<body');
            if (bodyTag !== -1) {
                const bodyOpenEnd = content.indexOf('>', bodyTag);
                if (bodyOpenEnd !== -1) {
                    const insertPos = bodyOpenEnd + 1;
                    content = content.slice(0, insertPos) + '\n    <!-- Header will be inserted here by JavaScript -->\n    <header id="header"></header>\n' + content.slice(insertPos);
                }
            }
        }
        
        // 4) Ensure footer container exists before </body>
        if (!content.includes('<footer id="footer"></footer>')) {
            const bodyCloseTag = content.lastIndexOf('</body>');
            if (bodyCloseTag !== -1) {
                content = content.slice(0, bodyCloseTag) + '\n    <!-- Footer will be inserted here by JavaScript -->\n    <footer id="footer"></footer>\n' + content.slice(bodyCloseTag);
            }
        }

        // 5) Ensure header/footer scripts are present before </body>
        const needHeader = !content.includes('js/header.js');
        const needFooter = !content.includes('js/footer.js');
        if (needHeader || needFooter) {
            const bodyCloseTag = content.lastIndexOf('</body>');
            if (bodyCloseTag !== -1) {
                let scripts = '\n    <!-- Header and Footer Scripts -->\n';
                if (needHeader) scripts += '    <script src="js/header.js"></script>\n';
                if (needFooter) scripts += '    <script src="js/footer.js"></script>\n';
                content = content.slice(0, bodyCloseTag) + scripts + content.slice(bodyCloseTag);
            }
        }

        // 6) Ensure global bootstrap module is present before </body>
        const needBootstrap = !content.includes('src/bootstrap.js');
        if (needBootstrap) {
            const bodyCloseTag = content.lastIndexOf('</body>');
            if (bodyCloseTag !== -1) {
                const tag = '    <script type="module" src="src/bootstrap.js"></script>\n';
                content = content.slice(0, bodyCloseTag) + tag + content.slice(bodyCloseTag);
            }
        }
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Process all HTML files in the directory
function processHtmlFiles(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip node_modules and other dot-directories
            if (file !== 'node_modules' && !file.startsWith('.')) {
                processHtmlFiles(filePath);
            }
        } else if (file.endsWith('.html')) {
            updateHtmlFile(filePath);
        }
    });
}

// Start processing from the current directory
processHtmlFiles(__dirname);
console.log('Finished updating HTML files!');
