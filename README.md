# PDF XRef Fixer

100% Claude Sonnet 4 written

A JavaScript library and web interface for fixing corrupted or missing cross-reference tables in PDF files.

## Overview

PDF files use cross-reference (xref) tables to efficiently locate objects within the file. When these tables become corrupted or missing, PDF readers may fail to open or properly display the document. This tool automatically reconstructs the cross-reference table and trailer section of PDF files.

## Features

- 🔧 **Automatic XRef Reconstruction**: Scans PDF content and rebuilds cross-reference tables
- 🗑️ **Footer Cleanup**: Removes existing corrupted footers before generating new ones
- 🌐 **Browser-Based Interface**: No installation required - works directly in web browsers
- 📁 **File Support**: Load PDF files or paste PDF data directly
- 💾 **Download Fixed PDFs**: Generate and download repaired PDF files
- 🧪 **Sample Data**: Includes test data for immediate experimentation
- ✅ **PDF Spec Compliant**: Follows PDF specification standards

## Quick Start

### Using the Web Interface

1. Open `index.html` in any modern web browser
2. Load a PDF file or click "Load Sample PDF" for testing
3. Click "Fix PDF Cross-Reference Table" 
4. Download the repaired PDF file

### Using the JavaScript Function

```javascript
// Load the PdfXrefFixer.js file
const fixedPdfData = FixXref(originalPdfData);
```

## API Reference

### `FixXref(pdfData)`

Fixes the cross-reference table and trailer in PDF data.

**Parameters:**
- `pdfData` (string): The PDF content as a text string

**Returns:**
- (string): The fixed PDF data with proper xref table and trailer

**Example:**
```javascript
const brokenPdf = `%PDF-1.7
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
xref
trailer
startxref
%%EOF`;

const fixedPdf = FixXref(brokenPdf);
console.log(fixedPdf);
```

## How It Works

1. **Footer Removal**: Detects and removes any existing xref table, trailer, startxref, and EOF markers
2. **Object Discovery**: Scans the PDF content to locate all object definitions and their byte positions
3. **XRef Generation**: Creates a properly formatted cross-reference table with accurate byte offsets
4. **Trailer Creation**: Builds a trailer dictionary with correct Size and Root object references
5. **StartXRef Calculation**: Determines the exact byte position where the xref table begins
6. **EOF Addition**: Appends the standard PDF end-of-file marker

## File Structure

```
PdfXrefFixer.js/
├── README.md           # This file
├── index.html          # Web interface for testing
├── PdfXrefFixer.js     # Core JavaScript library
├── sample.pdf          # Sample PDF for testing
├── output.pdf          # Example output file
├── prompt.md           # Original requirements
└── LICENSE             # License file
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

## Use Cases

- **PDF Repair**: Fix corrupted PDF files with broken xref tables
- **PDF Processing**: Prepare PDFs for further manipulation or conversion
- **Development Testing**: Validate PDF generation tools and libraries
- **Document Recovery**: Recover partially corrupted PDF documents

## Technical Details

### Cross-Reference Table Format

The tool generates xref tables following PDF specification standards:

```
xref
0 n
0000000000 65535 f 
0000000015 00000 n 
0000000109 00000 n 
```

Where:
- First line: `xref` keyword
- Second line: Starting object number and count
- Subsequent lines: 10-digit byte offset, 5-digit generation number, and status (n=in use, f=free)

### Trailer Dictionary

Generated trailers include essential PDF metadata:

```
trailer
<<
  /Size 7
  /Root 1 0 R
>>
```

## Limitations

- Only handles text-based PDF content (not binary streams within objects)
- Designed for PDFs with structural issues, not content corruption
- Does not repair damaged object content, only cross-reference tables

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter issues or have questions:

1. Check the browser console for error messages
2. Ensure your PDF data is in text format (not binary)
3. Verify the PDF contains valid object definitions
4. Try the sample PDF to confirm the tool is working correctly

## Changelog

### v1.0.0
- Initial release
- Core FixXref function implementation
- Web interface for testing
- Sample PDF data included
- Download functionality for fixed PDFs
