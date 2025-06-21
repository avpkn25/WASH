// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <Router>
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
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
