import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { UserCheck } from 'lucide-react';

const Teachers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="main-content">
        <Navbar title="Teachers" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <h1 className="page-title">Teachers Directory</h1>
        <div className="card" style={{ padding: "30px", textAlign: "center" }}>
          <UserCheck size={36} color="var(--navy)" style={{ marginBottom: "12px" }} />
          <h2 style={{ color: "var(--navy)", fontSize: "20px" }}>Faculty Directory</h2>
          <p style={{ color: "var(--navy-muted)", marginTop: "6px" }}>View and manage teacher profiles and assigned courses.</p>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
