import React, { useEffect, useState } from 'react';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students
  }, []);

  return (
    <div className="students-page">
      <h1>Students</h1>
      {/* Students list */}
    </div>
  );
};

export default Students;
