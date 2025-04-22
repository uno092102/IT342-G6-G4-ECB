// pages/AdminFeedbacks.jsx
import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get("/feedback/all");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Customer Feedback</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.feedbackId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{f.feedbackId}</td>
                <td className="py-2 px-4">{f.customer?.fname} {f.customer?.lname}</td>
                <td className="py-2 px-4">{f.feedbackDate}</td>
                <td className="py-2 px-4">{f.message}</td>
              </tr>
            ))}
            {feedbacks.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">No feedback available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedbacks;
