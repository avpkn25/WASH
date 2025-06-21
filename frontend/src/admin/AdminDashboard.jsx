import React from 'react';
import { User, PackageCheck, FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-pink-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">Admin Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            LOGOUT
          </button>
        </div>
      </nav>

      {/* DASHBOARD CONTENT */}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <DashboardCard
            icon={<User className="w-10 h-10 text-orange-500 mb-4" />}
            title="Manage Users(Manager)"
            desc="View, approve or deactivate customer and manager accounts."
            buttonText="Go to Users"
            onClick={() => navigate('/manageusers')}
          />
          <DashboardCard
            icon={<PackageCheck className="w-10 h-10 text-orange-500 mb-4" />}
            title="Manage Donations"
            desc="Track and verify donation transactions made by users."
            buttonText="View Donations"
            onClick={() => navigate('/managedonations')}
          />
          <DashboardCard
            icon={<FilePlus className="w-10 h-10 text-orange-500 mb-4" />}
            title="Add Distribution Center Manager"
            desc="Create and assign new distribution centers and managers."
            buttonText="Create Center"
            onClick={() => navigate('/createdcm')}
          />
        </div>
      </div>
    </div>
  );
}

const DashboardCard = ({ icon, title, desc, buttonText, onClick }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-all">
    {icon}
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-gray-500 text-sm mb-4">{desc}</p>
    <button
      onClick={onClick}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition"
    >
      {buttonText}
    </button>
  </div>
);

export default AdminDashboard;
