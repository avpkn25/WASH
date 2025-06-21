import React from 'react';
import { UserPlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function DcmDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-pink-100 flex flex-col">
      
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">Distribution Center Dashboard</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          LOGOUT
        </button>
      </nav>

      {/* CONTENT: WELCOME + CARDS */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Welcome Message */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Welcome, Distribution Center Manager!</h2>
          <p className="text-gray-500">Manage your center efficiently and serve your community.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl px-4">
          <DashboardCard
            icon={<UserPlus className="w-10 h-10 text-orange-500 mb-4" />}
            title="Add Person"
            desc="Register a new person in your distribution center."
            buttonText="Add Now"
            onClick={() => navigate('/addperson')}
          />
          <DashboardCard
            icon={<Users className="w-10 h-10 text-orange-500 mb-4" />}
            title="Manage Persons"
            desc="View, update or remove person records."
            buttonText="Manage"
            onClick={() => navigate('/managepersons')}
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

export default DcmDashboard;
