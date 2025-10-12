 import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const API_BASE_URL = "http://localhost:5000/api/admin";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications`);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      alert("Failed to load applications. Check backend or CORS setup.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/applications/${id}/status`, { status });
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
      alert(`Application status updated to "${status}"`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <div className="loading">Loading applications...</div>;

  return (
    <div className="admin-dashboard">
      <h1>DJ Applications Dashboard</h1>
      <div className="table-container">
        <table className="applications-table">
          <thead>
            <tr>
              <th>DJ Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Genre</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.djName}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.genre}</td>
                  <td>{app.experience}</td>
                  <td>
                    <span className={`status-badge ${app.status || "pending"}`}>
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => updateStatus(app.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => updateStatus(app.id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
