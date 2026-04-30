import React, { useEffect, useState } from 'react';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch assignments
  }, []);

  return (
    <div className="assignments-page">
      <h1>Assignments</h1>
      {/* Assignments content */}
    </div>
  );
};

export default Assignments;
