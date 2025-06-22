import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

function ManagerPerformance() {
  // Dummy data for testing
  const manager = {
    name: 'Manager Kavya',
    persons: [
      { name: 'Amit', completed: 12 },
      { name: 'Meena', completed: 18 },
      { name: 'Rahul', completed: 9 },
      { name: 'Sita', completed: 20 },
      { name: 'John', completed: 15 },
    ],
  };

  const handleAnnounceWinner = () => {
    if (!manager.persons || manager.persons.length === 0) {
      alert('No team data available to determine a winner.');
      return;
    }
    const winner = manager.persons.reduce((prev, curr) =>
      prev.completed > curr.completed ? prev : curr
    );
    alert(`🏆 Winner under ${manager.name} is ${winner.name} with ${winner.completed} completed tasks`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-100 p-8">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-8">
        Admin View - {manager.name}'s Team Performance
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={manager.persons} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#f97316" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleAnnounceWinner}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition"
          >
            Announce Weekly Winner
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagerPerformance;
