import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#8884d8"];

function ManageDonations() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/user/get-all-funds", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch donations");
        const data = await res.json();
        const mapped = data.map((fund) => ({
          name: fund.donorId?.fullName || "N/A",
          email: fund.donorId?.email || "N/A",
          fund: fund.amount,
          mode: fund.mode,
          date: new Date(fund.date).toLocaleDateString("en-IN"),
        }));
        setDonations(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const totalFund = donations.reduce((sum, d) => sum + d.fund, 0);
  const csrDonation = (totalFund * 2) / 100;

  // Prepare chart data
  const lineChartData = donations.reduce((acc, curr) => {
    const existing = acc.find((item) => item.date === curr.date);
    if (existing) existing.fund += curr.fund;
    else acc.push({ date: curr.date, fund: curr.fund });
    return acc;
  }, []);

  const pieChartData = ["UPI", "CARD", "NET_BANKING", "WALLET"].map((mode) => {
    const total = donations
      .filter((d) => d.mode === mode)
      .reduce((sum, d) => sum + d.fund, 0);
    return { name: mode, value: total };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-orange-600">Manage Donations</h1>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="flex items-center text-orange-600 hover:text-orange-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>

        <div className="text-right text-lg font-medium text-gray-700 mb-4">
          CSR Donations (2%):{" "}
          <span className="text-orange-600 font-bold">₹{csrDonation}</span>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading donations...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-orange-50 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold text-orange-700 mb-2">Donation Trend</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="fund" stroke="#FF8042" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold text-orange-700 mb-2">Mode of Payment</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-orange-200 text-orange-900">
                  <tr>
                    <th className="px-4 py-2 border">S.No</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Fund (₹)</th>
                    <th className="px-4 py-2 border">Mode</th>
                    <th className="px-4 py-2 border">Date</th>
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
                      <td className="px-4 py-2 border">{donation.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right text-lg font-medium text-gray-700 mt-4">
              Total Donations:{" "}
              <span className="text-orange-600 font-bold">₹{totalFund}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ManageDonations;
