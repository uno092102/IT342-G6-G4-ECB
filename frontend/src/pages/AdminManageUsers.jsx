// pages/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/customers");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleUpdate = async (userId) => {
    try {
      await api.put(`/admin/updateRole/${userId}?role=${newRole}`);
      setEditingRole(null);
      setNewRole("");
      // Refresh list
      const res = await api.get("/admin/customers");
      setUsers(res.data);
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/delete/${userId}`);
      setUsers(users.filter((u) => u.accountId !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.accountId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.accountId}</td>
                <td className="py-2 px-4">{user.fname} {user.lname}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 uppercase text-indigo-600 font-medium">
                  {editingRole === user.accountId ? (
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="">Select Role</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="CUSTOMER">CUSTOMER</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="py-2 px-4 space-x-2">
                  {editingRole === user.accountId ? (
                    <>
                      <button
                        onClick={() => handleRoleUpdate(user.accountId)}
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingRole(null)}
                        className="text-sm bg-gray-300 text-black px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingRole(user.accountId);
                          setNewRole(user.role);
                        }}
                        className="text-sm bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.accountId)}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUsers;
