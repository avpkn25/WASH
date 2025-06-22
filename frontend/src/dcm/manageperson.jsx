import React, { useState, useEffect } from "react";
import { Users, ArrowLeft, Pencil, Trash2, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ManagePersons() {
  const navigate = useNavigate();
  const [persons, setPersons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedPerson, setEditedPerson] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch persons from backend
  useEffect(() => {
    const fetchPersons = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/user/get-dsp", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch persons");
        const data = await res.json();
        setPersons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPersons();
  }, []);

  const handleEdit = (id) => {
    setEditingId(id);
    const person = persons.find((p) => p._id === id || p.id === id);
    setEditedPerson({ ...person });
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/user/update-dsp/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName: editedPerson.fullName || editedPerson.name,
          email: editedPerson.email,
          phone: editedPerson.phone,
          gender: editedPerson.gender,
          dob: editedPerson.dob,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update person");
      }
      const updated = await res.json();
      setPersons(persons.map((p) => (p._id === editingId ? updated : p)));
      setEditingId(null);
      setEditedPerson({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedPerson({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this person?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/user/delete-dsp/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete person");
      }
      setPersons(persons.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditedPerson({ ...editedPerson, [e.target.name]: e.target.value });
  };

  const filteredPersons = persons.filter(
    (p) =>
      (p.fullName || p.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (p.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.phone || "").includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-pink-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">Manage Persons</h1>
          </div>
          <button
            onClick={() => navigate("/dcmdashboard")}
            className="flex items-center text-orange-600 hover:text-orange-800 font-medium transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>

        {/* Error */}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {/* Loading */}
        {loading && <div className="mb-4 text-orange-600">Loading...</div>}

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
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-orange-200 text-orange-900">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Gender</th>
                <th className="py-2 px-4 border">DOB</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPersons.map((person) => (
                <tr
                  key={person._id || person.id}
                  className="text-center hover:bg-orange-50"
                >
                  {editingId === (person._id || person.id) ? (
                    <>
                      <td className="border px-4 py-2">
                        <input
                          name="fullName"
                          value={
                            editedPerson.fullName || editedPerson.name || ""
                          }
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          name="email"
                          value={editedPerson.email || ""}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          name="phone"
                          value={editedPerson.phone || ""}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <select
                          name="gender"
                          value={editedPerson.gender || ""}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="">Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="date"
                          name="dob"
                          value={editedPerson.dob || ""}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="border px-4 py-2 flex justify-center gap-2">
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
                      <td className="py-2 px-4 border">
                        {person.fullName || person.name}
                      </td>
                      <td className="py-2 px-4 border">{person.email}</td>
                      <td className="py-2 px-4 border">{person.phone}</td>
                      <td className="py-2 px-4 border">{person.gender}</td>
                      <td className="py-2 px-4 border">{person.dob}</td>
                      <td className="py-2 px-4 border flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(person._id || person.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(person._id || person.id)}
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
      </div>
    </div>
  );
}

export default ManagePersons;
