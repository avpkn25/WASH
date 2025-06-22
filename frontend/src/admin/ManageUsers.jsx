import React, { useState, useEffect } from "react";
import { Users, ArrowLeft, Pencil, Trash2, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/get-dcm");
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    setEditingId(id);
    const user = users.find((u) => u.id === id);
    // Map 'name' to 'fullName' for editing
    setEditedUser({
      fullName: user.name,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleSave = async () => {
    try {
      // Send 'fullName' instead of 'name' to backend
      const res = await fetch(`/api/user/update-dcm/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedUser),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const updated = await res.json();
      // Map 'fullName' back to 'name' for frontend state
      setUsers(
        users.map((u) =>
          u.id === editingId
            ? {
                ...u,
                fullName: updated.fullName,
                email: updated.email,
                phone: updated.phone,
              }
            : u
        )
      );
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedUser({});
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`/api/user/delete-dcm/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete user");
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-pink-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
          </div>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="flex items-center text-orange-600 hover:text-orange-800 font-medium transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-8">Loading users...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-orange-200 text-orange-900">
                <tr>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="text-center hover:bg-orange-50">
                    {editingId === user.id ? (
                      <>
                        <td className="border px-2 py-1">
                          <input
                            name="name"
                            value={editedUser.name}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            name="phone"
                            value={editedUser.phone}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="border px-2 py-1 flex justify-center gap-2">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-2 px-4 border">{user.name}</td>
                        <td className="py-2 px-4 border">{user.email}</td>
                        <td className="py-2 px-4 border">{user.phone}</td>
                        <td className="py-2 px-4 border flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
