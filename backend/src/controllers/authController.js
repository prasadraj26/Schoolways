// Auth Controller

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Handle login logic
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Handle registration logic
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // Handle logout logic
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
