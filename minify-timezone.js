const fs = require('fs');
const path = require('path');

function minifyTimezoneData(inputPath, outputPath) {
    // Read the input file
    let content = fs.readFileSync(inputPath, 'utf8');
    
    // Remove comments and unnecessary whitespace
    content = content
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\s*{\s*/g, '{') // Remove spaces around braces
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*:\s*/g, ':') // Remove spaces around colons
        .replace(/\s*,\s*/g, ',') // Remove spaces around commas
        .replace(/\s*\[\s*/g, '[') // Remove spaces around brackets
        .replace(/\s*\]\s*/g, ']')
        .replace(/^\s+|\s+$/g, ''); // Trim start and end

    // Write the minified content
    fs.writeFileSync(outputPath, content);
    
    // Calculate size reduction
    const originalSize = fs.statSync(inputPath).size;
    const minifiedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    console.log(`Original size: ${originalSize} bytes`);
    console.log(`Minified size: ${minifiedSize} bytes`);
    console.log(`Reduction: ${reduction}%`);
}

// Usage
const inputFile = 'timezone.js';
const outputFile = 'timezone.min.js';

minifyTimezoneData('timezone.js', 'timezone_min.js'); 