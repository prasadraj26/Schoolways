// Parent Controller

exports.getParentDashboard = async (req, res) => {
  try {
    // Get parent dashboard
    res.status(200).json({ message: 'Parent dashboard' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChildAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    // Get child's attendance
    res.status(200).json({ message: 'Child attendance' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChildResults = async (req, res) => {
  try {
    const { studentId } = req.params;
    // Get child's results
    res.status(200).json({ message: 'Child results' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
