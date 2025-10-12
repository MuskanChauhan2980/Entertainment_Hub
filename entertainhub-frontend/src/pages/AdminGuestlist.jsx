 import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminGuestlist.css";

const AdminPromoter = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/promoterFrom/all");
      setApplications(res.data.data);
    } catch (err) {
      console.error("Error fetching promoter applications", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/promoterFrom/status/${id}`, { status });
      fetchApplications(); // Refresh table
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="admin-container">
      <h2>Promoter Applications</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>{a.fullName}</td>
              <td>{a.email}</td>
              <td>{a.phone}</td>
              <td>{a.guestCount}</td>
              <td className={`status ${a.status.toLowerCase()}`}>{a.status}</td>
              <td>
                <button
                  className="approve-btn"
                  onClick={() => updateStatus(a.id, "APPROVED")}
                  disabled={a.status === "APPROVED"}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => updateStatus(a.id, "REJECTED")}
                  disabled={a.status === "REJECTED"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPromoter;
