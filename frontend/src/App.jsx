import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Signup from './admin/createdcm';
import AdminDashboard from './admin/AdminDashboard';
import SecretAdminLink from './admin/SecretAdminLink';
import AdminLogin from './admin/AdminLogin';
function App() {
  return (
    <Router>
          <SecretAdminLink />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

      </Routes>
    </Router>
  );
}

export default App;
