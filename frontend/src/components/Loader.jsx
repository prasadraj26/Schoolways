import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ fontSize: "14px", fontWeight: "500", color: "var(--navy-muted)" }}>Loading...</p>
    </div>
  );
};

export default Loader;
