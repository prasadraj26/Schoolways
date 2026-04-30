import React, { useState } from 'react';

const TeacherForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="teacher-form">
      {/* Form fields */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TeacherForm;
