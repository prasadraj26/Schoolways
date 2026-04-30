const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const attendanceService = {
  getAttendance: async (studentId, startDate, endDate) => {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const response = await fetch(`${API_BASE_URL}/attendance/${studentId}?${params}`);
      return response.json();
    } catch (error) {
      console.error('Get attendance error:', error);
      throw error;
    }
  },

  markAttendance: async (attendanceData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendanceData)
      });
      return response.json();
    } catch (error) {
      console.error('Mark attendance error:', error);
      throw error;
    }
  }
};

export default attendanceService;
