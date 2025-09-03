/**
 * Fixes the cross-reference table and trailer in PDF data
 * @param {string} pdfData - The PDF data as a string
 * @returns {string} - The fixed PDF data with proper xref table and trailer
 */
function FixXref(pdfData) {
    // Remove any existing footer (xref table, trailer, startxref, %%EOF)
    let cleanData = pdfData.replace(/\n*xref[\s\S]*$/i, '');
    
    // Find all PDF objects and their positions
    const objects = [];
    const objectRegex = /(\d+)\s+(\d+)\s+obj/g;
    let match;
    
    while ((match = objectRegex.exec(cleanData)) !== null) {
        const objNumber = parseInt(match[1]);
        const generation = parseInt(match[2]);
        const position = match.index;
        
        objects.push({
            number: objNumber,
            generation: generation,
            position: position,
            inUse: true
        });
    }
    
    // Sort objects by object number
    objects.sort((a, b) => a.number - b.number);
    
    // Calculate the highest object number to determine the size
    const maxObjNumber = objects.length > 0 ? Math.max(...objects.map(obj => obj.number)) : 0;
    const size = maxObjNumber + 1;
    
    // Build the cross-reference table
    let xrefTable = 'xref\n';
    xrefTable += `0 ${size}\n`;
    
    // Add entry for object 0 (always free)
    xrefTable += '0000000000 65535 f \n';
    
    // Add entries for each object
    for (let i = 1; i < size; i++) {
        const obj = objects.find(o => o.number === i);
        if (obj) {
            // Format position as 10-digit zero-padded number
            const positionStr = obj.position.toString().padStart(10, '0');
            const generationStr = obj.generation.toString().padStart(5, '0');
            xrefTable += `${positionStr} ${generationStr} n \n`;
        } else {
            // Object doesn't exist, mark as free
            xrefTable += '0000000000 65535 f \n';
        }
    }
    
    // Build the trailer
    let trailer = 'trailer\n';
    trailer += '<<\n';
    trailer += `  /Size ${size}\n`;
    
    // Find the root object (catalog)
    const rootMatch = cleanData.match(/(\d+)\s+\d+\s+obj[\s\S]*?\/Type\s*\/Catalog/i);
    if (rootMatch) {
        trailer += `  /Root ${rootMatch[1]} 0 R\n`;
    }
    
    trailer += '>>\n';
    
    // Calculate startxref position
    const xrefPosition = cleanData.length + 1; // +1 for the newline before xref
    
    // Build the complete footer
    let footer = '\n' + xrefTable + '\n' + trailer + '\n';
    footer += 'startxref\n';
    footer += xrefPosition + '\n';
    footer += '%%EOF\n';
    
    return cleanData + footer;
}

// Export for use in Node.js if available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FixXref };
}