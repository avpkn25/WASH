// File: src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Campaigns from './components/Campaign';
import UpcomingEvents from './components/UpcomingEvents';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './components/Blog';
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


function DashboardWrapper() {
  const location = useLocation();
  const donor = location.state?.donor;
  return <DonorDashboard donor={donor} />;
}

function App() {
  return (
    <>
      <Header />
      <SecretAdminLink />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="home"><Hero /></div>
              <div id="about"><About /></div>
              <Stats />
              <Campaigns />
              <UpcomingEvents />
              <div id="contact"><Contact /></div>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/createdcm" element={<Signup />} />
        <Route path="/dcmdashboard" element={<DcmDashboard />} />
        <Route path="/addperson" element={<AddPerson />} />
        <Route path="/managepersons" element={<ManagePersons />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/person-dashboard" element={<PersonDashboard />} />
        <Route path="/managedonations" element={<ManageDonations />} />

        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
