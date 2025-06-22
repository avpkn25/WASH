import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  ClipboardList,
  BarChart2,
  Moon,
  Sun,
  Languages,
} from "lucide-react";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

const PersonDashboard = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Attend WASH training", completed: false },
    { id: 2, title: "Distribute hygiene kits", completed: true },
    { id: 3, title: "Submit daily report", completed: false },
    { id: 4, title: "Inspect water tanks", completed: true },
  ]);

  // 🌐 Fetch DSP profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`/api/user/dsp/profile/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch DSP profile", error);
      }
    };

    fetchProfile();
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const text = {
    en: {
      dashboard: "Person Dashboard",
      tasks: "Tasks",
      analytics: "Analytics",
      completed: "Completed",
      pending: "Pending",
      switchLang: "Switch to Hindi",
      logout: "Logout",
    },
    hi: {
      dashboard: "व्यक्ति डैशबोर्ड",
      tasks: "कार्य",
      analytics: "एनालिटिक्स",
      completed: "पूर्ण",
      pending: "बाकी",
      switchLang: "अंग्रेज़ी में स्विच करें",
      logout: "लॉगआउट",
    },
  };

  const t = text[language];

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const completionRate = Math.round(
    (completedTasks.length / tasks.length) * 100
  );

  const markAsCompleted = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: true } : task))
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-orange-50 text-gray-800"
      }`}
    >
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`w-64 min-h-screen p-6 shadow-xl space-y-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold text-orange-500 mb-8">
            {t.dashboard}
          </h1>
          <nav className="space-y-4">
            {[
              { label: t.tasks, value: "tasks", icon: ClipboardList },
              { label: t.analytics, value: "analytics", icon: BarChart2 },
            ].map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-xl transition ${
                  activeTab === value
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-100 text-gray-700"
                }`}
                onClick={() => setActiveTab(value)}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>

          {/* Theme, Language, Logout */}
          <div className="flex flex-col gap-3 pt-6 border-t">
            <div className="flex gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 hover:scale-105 transition"
              >
                {darkMode ? (
                  <Sun className="text-yellow-300" />
                ) : (
                  <Moon className="text-gray-700" />
                )}
                <span className="text-sm">{darkMode ? "Light" : "Dark"}</span>
              </button>
              <button
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="flex items-center gap-2 hover:scale-105 transition"
              >
                <Languages />
                <span className="text-sm">{t.switchLang}</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition mt-3"
            >
              {t.logout}
            </button>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-6">
          {/* TASKS */}
          {activeTab === "tasks" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">{t.tasks}</h2>

              {/* Progress */}
              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-2">
                  Overall Progress
                </p>
                <div className="w-full bg-orange-100 rounded-xl overflow-hidden h-5 shadow-inner">
                  <div
                    className="bg-orange-500 h-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-600 mt-1">
                  {completionRate}% completed
                </p>
              </div>

              {/* Pending */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-orange-700 mb-4">
                  Tasks Yet to be Done
                </h2>
                {pendingTasks.length === 0 ? (
                  <p className="text-green-600 font-medium">
                    All tasks completed!
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {pendingTasks.map((task) => (
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

              {/* Completed */}
              <div>
                <h2 className="text-xl font-semibold text-orange-700 mb-4">
                  Completed Tasks
                </h2>
                {completedTasks.length === 0 ? (
                  <p className="text-gray-500">No tasks completed yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {completedTasks.map((task) => (
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
          )}

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">{t.analytics}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm">
                  <Line
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      datasets: [
                        {
                          label: "Kits Distributed",
                          data: [20, 35, 40, 30, 45, 60],
                          backgroundColor: "#f97316",
                          borderColor: "#f97316",
                          tension: 0.4,
                        },
                      ],
                    }}
                  />
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm">
                  <Pie
                    data={{
                      labels: ["Water", "Sanitation", "Education"],
                      datasets: [
                        {
                          label: "Activities",
                          data: [40, 30, 30],
                          backgroundColor: ["#f97316", "#60a5fa", "#facc15"],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PersonDashboard;
