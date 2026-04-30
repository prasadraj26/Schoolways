const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const reportService = {
  generateReport: async (reportType, filters) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: reportType, ...filters })
      });
      return response.json();
    } catch (error) {
      console.error('Generate report error:', error);
      throw error;
    }
  },

  getReports: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports`);
      return response.json();
    } catch (error) {
      console.error('Get reports error:', error);
      throw error;
    }
  },

  downloadReport: async (reportId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${reportId}/download`);
      return response.blob();
    } catch (error) {
      console.error('Download report error:', error);
      throw error;
    }
  }
};

export default reportService;
