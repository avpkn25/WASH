import React, { useState } from 'react';
import { Users, ArrowLeft, Pencil, Trash2, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ManagePersons() {
  const navigate = useNavigate();

  const initialData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      gender: 'Male',
      dob: '1990-05-20',
    },
    {
      id: 2,
      name: 'Meena Yakkala',
      email: 'meena@example.com',
      phone: '9123456780',
      gender: 'Female',
      dob: '1998-07-15',
    },
    {
      id: 3,
      name: 'Ravi Kumar',
      email: 'ravi@example.com',
      phone: '9090909090',
      gender: 'Male',
      dob: '1988-11-30',
    },
  ];

  const [persons, setPersons] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editedPerson, setEditedPerson] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (id) => {
    setEditingId(id);
    const person = persons.find(p => p.id === id);
    setEditedPerson({ ...person });
  };

  const handleSave = () => {
    setPersons(persons.map(p => (p.id === editingId ? editedPerson : p)));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedPerson({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      setPersons(persons.filter(p => p.id !== id));
    }
  };

  const handleChange = (e) => {
    setEditedPerson({ ...editedPerson, [e.target.name]: e.target.value });
  };

  const filteredPersons = persons.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm)
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
            onClick={() => navigate('/dcmdashboard')}
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
                <tr key={person.id} className="text-center hover:bg-orange-50">
                  {editingId === person.id ? (
                    <>
                      <td className="border px-4 py-2">
                        <input name="name" value={editedPerson.name} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                      </td>
                      <td className="border px-4 py-2">
                        <input name="email" value={editedPerson.email} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                      </td>
                      <td className="border px-4 py-2">
                        <input name="phone" value={editedPerson.phone} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                      </td>
                      <td className="border px-4 py-2">
                        <select name="gender" value={editedPerson.gender} onChange={handleChange} className="border rounded px-2 py-1 w-full">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </td>
                      <td className="border px-4 py-2">
                        <input type="date" name="dob" value={editedPerson.dob} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
                      </td>
                      <td className="border px-4 py-2 flex justify-center gap-2">
                        <button onClick={handleSave} className="text-green-600 hover:text-green-800">
                          <Save className="w-5 h-5" />
                        </button>
                        <button onClick={handleCancel} className="text-red-600 hover:text-red-800">
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 border">{person.name}</td>
                      <td className="py-2 px-4 border">{person.email}</td>
                      <td className="py-2 px-4 border">{person.phone}</td>
                      <td className="py-2 px-4 border">{person.gender}</td>
                      <td className="py-2 px-4 border">{person.dob}</td>
                      <td className="py-2 px-4 border flex justify-center gap-2">
                        <button onClick={() => handleEdit(person.id)} className="text-blue-600 hover:text-blue-800">
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(person.id)} className="text-red-600 hover:text-red-800">
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
