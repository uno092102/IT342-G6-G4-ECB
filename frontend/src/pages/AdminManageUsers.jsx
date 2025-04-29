import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";
import EditUserModal from "./EditUserModal";
import ConfirmDeleteUserModal from "./ConfirmDeleteUserModal";

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/customers");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const totalRecords = users.length;
  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);
  const currentRecords = users.slice(startRecord - 1, endRecord);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (endRecord < totalRecords) setCurrentPage(currentPage + 1);
  };

  const updateUserInList = (updatedUser) => {
    setUsers(users.map(u => u.accountId === updatedUser.accountId ? updatedUser : u));
  };

  const removeUserFromList = (id) => {
    setUsers(users.filter(u => u.accountId !== id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="text-sm text-gray-600 mb-2">
        Showing {startRecord}-{endRecord} of {totalRecords} records
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Last Name</th>
              <th className="py-2 px-4">Username</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((user) => (
              <tr key={user.accountId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.accountId}</td>
                <td className="py-2 px-4">{user.fname}</td>
                <td className="py-2 px-4">{user.lname}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phoneNumber}</td>
                <td className="py-2 px-4">{user.address}</td>
                <td className="py-2 px-4 uppercase text-indigo-600 font-medium">{user.role}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => setEditUser(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteUserId(user.accountId)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={endRecord >= totalRecords}
          className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onUpdated={updateUserInList}
          refreshUsers={fetchUsers}
        />
      )}

      {deleteUserId && (
        <ConfirmDeleteUserModal
          userId={deleteUserId}
          onClose={() => setDeleteUserId(null)}
          onDeleted={removeUserFromList}
        />
      )}
    </div>
  );
};

export default AdminManageUsers;
