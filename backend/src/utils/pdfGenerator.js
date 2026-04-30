const PDFDocument = require('pdfkit');
const fs = require('fs');

class PDFGenerator {
  static async generate(data, filename = 'report.pdf') {
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filename);

      doc.pipe(stream);

      // Add title
      doc.fontSize(25).text(data.title || 'Report', 100, 100);

      // Add content
      doc.fontSize(12).text(data.content || '', 100, 150);

      doc.end();

      return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(filename));
        stream.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Failed to generate PDF: ${error.message}`);
    }
  }
}

module.exports = PDFGenerator;
