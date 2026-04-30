const Excel = require('exceljs');

class ExcelGenerator {
  static async generate(data, filename = 'report.xlsx') {
    try {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      // Add headers
      if (data.headers) {
        worksheet.addRow(data.headers);
      }

      // Add data rows
      if (data.rows) {
        data.rows.forEach(row => {
          worksheet.addRow(row);
        });
      }

      await workbook.xlsx.writeFile(filename);
      return filename;
    } catch (error) {
      throw new Error(`Failed to generate Excel: ${error.message}`);
    }
  }
}

module.exports = ExcelGenerator;
