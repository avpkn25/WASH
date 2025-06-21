import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ManageDonations() {
  const navigate = useNavigate();

  const donations = [
    { name: 'Amit Sharma', email: 'amit@example.com', fund: 1500, mode: 'UPI' },
    { name: 'Meena Yakkala', email: 'meena@example.com', fund: 2500, mode: 'Card' },
    { name: 'Ravi Kumar', email: 'ravi@example.com', fund: 1000, mode: 'Net Banking' },
  ];

  const totalFund = donations.reduce((sum, d) => sum + d.fund, 0);
  const csrDonation = (totalFund * 2) / 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-orange-600">Manage Donations</h1>
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center text-orange-600 hover:text-orange-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>

        {/* CSR Info */}
        <div className="text-right text-lg font-medium text-gray-700 mb-4">
          CSR Donations (2%): <span className="text-orange-600 font-bold">₹{csrDonation}</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-orange-200 text-orange-900">
              <tr>
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Fund (₹)</th>
                <th className="px-4 py-2 border">Mode</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index} className="text-center hover:bg-orange-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{donation.name}</td>
                  <td className="px-4 py-2 border">{donation.email}</td>
                  <td className="px-4 py-2 border">₹{donation.fund}</td>
                  <td className="px-4 py-2 border">{donation.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total at Bottom */}
        <div className="text-right text-lg font-medium text-gray-700 mt-4">
          Total Donations: <span className="text-orange-600 font-bold">₹{totalFund}</span>
        </div>
      </div>
    </div>
  );
}

export default ManageDonations;
