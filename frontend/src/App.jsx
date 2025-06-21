import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Signup from './admin/createdcm';
import AdminDashboard from './admin/AdminDashboard';
import SecretAdminLink from './admin/SecretAdminLink';
import AdminLogin from './admin/AdminLogin';
import ManageUsers from './admin/ManageUsers';
import DcmDashboard from './dcm/DcmDashboard';
import AddPerson from './dcm/addperson';
import ManagePersons from './dcm/manageperson';
import PersonDashboard from './dsp/persondashboard';
import ManageDonations from './admin/ManageDonations';


function App() {
  return (
    <Router>
          <SecretAdminLink />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/createdcm" element={<Signup />} />
        <Route path="/dcmdashboard" element={<DcmDashboard />} />
        <Route path="/addperson" element={<AddPerson />} />
        <Route path="/managepersons" element={<ManagePersons />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/person-dashboard" element={<PersonDashboard />} />
        <Route path="/managedonations" element={<ManageDonations />} />


      </Routes>
    </Router>
  );
}

export default App;
