import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function Performance() {
  const persons = [
    { id: 1, name: 'Meena', bottlesSupplied: 140 },
    { id: 2, name: 'Ravi', bottlesSupplied: 90 },
    { id: 3, name: 'Kiran', bottlesSupplied: 105 },
    { id: 4, name: 'Sita', bottlesSupplied: 175 },
    { id: 5, name: 'Amit', bottlesSupplied: 120 }
  ];

  const [winnerId, setWinnerId] = useState(null);
  const winner = persons.find((p) => p.id === winnerId);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-green-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Weekly Performance Report</h1>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={persons}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bottlesSupplied"
              stroke="#f97316"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Winner Selection */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-green-700 mb-4 text-center">Select Person of the Week</h2>
          <ul className="space-y-4">
            {persons.map((person) => (
              <li
                key={person.id}
                className={`flex justify-between items-center px-6 py-4 rounded-xl border ${
                  person.id === winnerId ? 'bg-green-100 border-green-400' : 'bg-orange-50 border-orange-200'
                }`}
              >
                <span className="text-lg text-gray-800">
                  {person.name} — {person.bottlesSupplied} bottles
                </span>
                <button
                  onClick={() => setWinnerId(person.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    person.id === winnerId
                      ? 'bg-green-500 text-white cursor-default'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                  disabled={person.id === winnerId}
                >
                  {person.id === winnerId ? 'Winner Selected' : 'Select as Winner'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Display Winner */}
        {winner && (
          <div className="text-center mt-10 border-t pt-6 border-gray-200">
            <h3 className="text-2xl font-bold text-green-700">🏆 Person of the Week</h3>
            <p className="text-lg mt-2 text-gray-800">
              {winner.name} supplied{' '}
              <span className="font-semibold text-orange-600">{winner.bottlesSupplied}</span> water bottles!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Performance;
