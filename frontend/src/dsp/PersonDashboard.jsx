import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

function PersonDashboard() {
  const initialTasks = [
    { id: 1, title: 'Attend WASH training', completed: false },
    { id: 2, title: 'Distribute hygiene kits', completed: true },
    { id: 3, title: 'Submit daily report', completed: false },
    { id: 4, title: 'Inspect water tanks', completed: true },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const markAsCompleted = (id) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, completed: true } : task)
    );
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = Math.round((completedTasks.length / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Person Dashboard</h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <p className="text-gray-700 font-medium mb-2">Overall Progress</p>
          <div className="w-full bg-orange-100 rounded-xl overflow-hidden h-5 shadow-inner">
            <div
              className="bg-orange-500 h-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">{completionRate}% completed</p>
        </div>

        {/* Yet to be done */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-orange-700 mb-4">Tasks Yet to be Done</h2>
          {pendingTasks.length === 0 ? (
            <p className="text-green-600 font-medium">All tasks completed!</p>
          ) : (
            <ul className="space-y-3">
              {pendingTasks.map(task => (
                <li
                  key={task.id}
                  className="flex justify-between items-center bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl shadow-sm"
                >
                  <span className="text-gray-700">{task.title}</span>
                  <button
                    onClick={() => markAsCompleted(task.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition"
                  >
                    Mark as Completed
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-xl font-semibold text-orange-700 mb-4">Completed Tasks</h2>
          {completedTasks.length === 0 ? (
            <p className="text-gray-500">No tasks completed yet.</p>
          ) : (
            <ul className="space-y-3">
              {completedTasks.map(task => (
                <li
                  key={task.id}
                  className="flex justify-between items-center bg-white border border-green-200 px-4 py-3 rounded-xl shadow-sm"
                >
                  <span className="text-gray-700">{task.title}</span>
                  <CheckCircle className="text-green-500 w-5 h-5" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonDashboard;
