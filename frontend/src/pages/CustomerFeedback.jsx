// pages/CustomerFeedback.jsx
import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const CustomerFeedback = () => {
  const [message, setMessage] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/feedback/customer/${user.accountId}`);
        setFeedbackList(res.data);
      } catch (err) {
        console.error("Failed to load feedback:", err);
      }
    };
  
    fetchData();
  }, [user.accountId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      await api.post(`/feedback/submit?accountId=${user.accountId}&message=${encodeURIComponent(message)}`);
      setMessage("");
      const res = await api.get(`/feedback/customer/${user.accountId}`);
      setFeedbackList(res.data);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold">Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
          rows={4}
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>

      <div className="pt-6 border-t">
        <h3 className="text-md font-semibold mb-2">Your Previous Feedback</h3>
        <ul className="space-y-2">
          {feedbackList.map((f) => (
            <li key={f.feedbackId} className="bg-gray-100 p-3 rounded">
              <div className="text-sm text-gray-700">{f.message}</div>
              <div className="text-xs text-gray-400 mt-1">{f.feedbackDate}</div>
            </li>
          ))}
          {feedbackList.length === 0 && (
            <p className="text-sm text-gray-500">No feedback submitted yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CustomerFeedback;
