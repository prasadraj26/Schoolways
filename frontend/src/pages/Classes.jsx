import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { School } from 'lucide-react';

const Classes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="main-content">
        <Navbar title="Classes" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <h1 className="page-title">Classes Management</h1>
        <div className="card" style={{ padding: "30px", textAlign: "center" }}>
          <School size={36} color="var(--navy)" style={{ marginBottom: "12px" }} />
          <h2 style={{ color: "var(--navy)", fontSize: "20px" }}>Class Directory</h2>
          <p style={{ color: "var(--navy-muted)", marginTop: "6px" }}>Manage school classes, sections, and room assignments.</p>
        </div>
      </div>
    </div>
  );
};

export default Classes;
