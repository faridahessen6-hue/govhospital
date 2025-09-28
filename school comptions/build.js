const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const PAGES_DIR = path.join(__dirname, 'src', 'pages');
const LAYOUTS_DIR = path.join(SRC_DIR, 'layouts');
const BUILD_DIR = __dirname;

// Ensure build directory exists
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Read layout template
const layoutTemplate = fs.readFileSync(
    path.join(LAYOUTS_DIR, 'main.html'), 
    'utf-8'
);

// Process each page
try {
    // Get all HTML files in pages directory
    const pageFiles = fs.readdirSync(PAGES_DIR)
        .filter(file => file.endsWith('.html'));

    // Process each page
    pageFiles.forEach(pageFile => {
        const pageName = path.basename(pageFile, '.html');
        const pagePath = path.join(PAGES_DIR, pageFile);
        const outputPath = path.join(BUILD_DIR, pageFile);
        
        // Read page content
        const pageContent = fs.readFileSync(pagePath, 'utf-8');
        
        // Render with layout
        const html = ejs.render(layoutTemplate, {
            title: pageName.charAt(0).toUpperCase() + pageName.slice(1),
            content: pageContent,
            styles: '',
            scripts: ''
        });
        
        // Write output file
        fs.writeFileSync(outputPath, html);
        console.log(`Generated: ${pageFile}`);
    });
    
    console.log('\nBuild completed successfully!');
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
