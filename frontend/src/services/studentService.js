const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const studentService = {
  getAllStudents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      return response.json();
    } catch (error) {
      console.error('Get students error:', error);
      throw error;
    }
  },

  getStudentById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`);
      return response.json();
    } catch (error) {
      console.error('Get student error:', error);
      throw error;
    }
  },

  createStudent: async (studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      return response.json();
    } catch (error) {
      console.error('Create student error:', error);
      throw error;
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      return response.json();
    } catch (error) {
      console.error('Update student error:', error);
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    } catch (error) {
      console.error('Delete student error:', error);
      throw error;
    }
  }
};

export default studentService;
