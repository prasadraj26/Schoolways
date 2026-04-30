import React, { useEffect, useState } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch teacher reports
  }, []);

  return (
    <div className="reports-page">
      <h1>Reports</h1>
      {/* Reports content */}
    </div>
  );
};

export default Reports;
