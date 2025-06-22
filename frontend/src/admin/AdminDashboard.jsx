import React, { useState } from "react";
import { User, PackageCheck, FilePlus, Mail, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sendBulkEmails } from "../api/sendBulkEmails";

function AdminDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-pink-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">Admin Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            LOGOUT
          </button>
        </div>
      </nav>

      {/* DASHBOARD CONTENT */}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <DashboardCard
            icon={<User className="w-10 h-10 text-orange-500 mb-4" />}
            title="Manage Users (Manager)"
            desc="View, approve or deactivate customer and manager accounts."
            buttonText="Go to Users"
            onClick={() => navigate("/manageusers")}
          />
          <DashboardCard
            icon={<PackageCheck className="w-10 h-10 text-orange-500 mb-4" />}
            title="Manage Donations"
            desc="Track and verify donation transactions made by users."
            buttonText="View Donations"
            onClick={() => navigate("/managedonations")}
          />
          <DashboardCard
            icon={<FilePlus className="w-10 h-10 text-orange-500 mb-4" />}
            title="Add Distribution Center Manager"
            desc="Create and assign new distribution centers and managers."
            buttonText="Create Center"
            onClick={() => navigate("/createdcm")}
          />
          <DashboardCard
            icon={<PackageCheck className="w-10 h-10 text-orange-500 mb-4" />}
            title="Performance Analytics"
            desc="Analyze manager team performance and select weekly winner."
            buttonText="View Analytics"
            onClick={() => navigate("/managerperformance")}
          />
        </div>

        {/* Email Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow hover:bg-orange-600 transition"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </button>
        </div>
      </div>

      {/* Email Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative animate-zoom-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-orange-600">
              Send Emails
            </h2>

            <textarea
              placeholder="Enter emails (comma or newline separated)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
            <input
              type="text"
              placeholder="Subject (optional)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />

            <button
              onClick={async () => {
                const emails = email
                  .split(/[\n,]+/)
                  .map((e) => e.trim())
                  .filter(Boolean);

                const invalidEmails = emails.filter(
                  (e) => !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(e)
                );

                if (invalidEmails.length > 0) {
                  alert(`Invalid email(s): ${invalidEmails.join(", ")}`);
                  return;
                }

                try {
                  await sendBulkEmails({ emails, subject, message });
                  alert(`Email sent to:\n${emails.join("\n")}`);
                  setEmail("");
                  setSubject("");
                  setMessage("");
                  setShowModal(false);
                } catch (err) {
                  alert("Failed to send emails: " + err.message);
                }
              }}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
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
