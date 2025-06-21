import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero.jpeg';
import { jsPDF } from 'jspdf';

function Hero() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    dob: '',
    amount: 1,
    paymentMode: 'upi'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validateForm = () => {
    const { fullName, email, password, phone, gender, dob } = formData;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !email || !password || !phone || !gender || !dob) {
      alert('Please fill all fields.');
      return false;
    }

    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return false;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return false;
    }

    if (!phoneRegex.test(phone)) {
      alert('Phone number must be exactly 10 digits.');
      return false;
    }

    return true;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();

    if (formData.amount < 1) {
      alert('Please enter a valid donation amount.');
      return;
    }

    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    generatePDF();
    setShowForm(false);
    setShowThankYou(true);
    document.querySelector('footer').style.display = 'none'; // Hide footer
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(18);
    doc.text('Donation Receipt', 70, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 35);
    doc.text(`Name: ${formData.fullName}`, 14, 45);
    doc.text(`Email: ${formData.email}`, 14, 55);
    doc.text(`Amount: ₹${formData.amount}`, 14, 65);
    doc.text(`Payment Mode: ${formData.paymentMode.toUpperCase()}`, 14, 75);

    doc.save('Donation_Receipt.pdf');
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-[85vh] flex items-center justify-center text-center px-4"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <motion.div
        className="relative z-10 text-white max-w-3xl px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1 className="text-5xl font-extrabold mb-6">Give a little, Change a lot</motion.h1>
        <motion.p className="text-lg text-orange-100 mb-8">Your support brings health, dignity, and change.</motion.p>
        <motion.div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              setShowForm(true);
              setStep(1);
              setTermsAccepted(false);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md transition"
          >
            Donate Now
          </button>
          <a href="#about">
            <button className="bg-white hover:bg-orange-100 text-orange-600 px-6 py-3 rounded-md transition">
              Learn More
            </button>
          </a>
        </motion.div>
      </motion.div>

      {/* Modal Step Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>

            {step === 1 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-orange-600">Register</h2>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <input type="text" name="fullName" placeholder="Full Name" required className="w-full border rounded px-4 py-2" value={formData.fullName} onChange={handleInputChange} />
                  <input type="email" name="email" placeholder="Email" required className="w-full border rounded px-4 py-2" value={formData.email} onChange={handleInputChange} />
                  <input type="password" name="password" placeholder="Password" required className="w-full border rounded px-4 py-2" value={formData.password} onChange={handleInputChange} />
                  <input type="tel" name="phone" placeholder="Phone Number" required className="w-full border rounded px-4 py-2" value={formData.phone} onChange={handleInputChange} />
                  <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full border rounded px-4 py-2">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <input type="date" name="dob" required className="w-full border rounded px-4 py-2" value={formData.dob} onChange={handleInputChange} />
                  <button type="submit" className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600">Continue</button>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-orange-600">Donation Details</h2>
                <form onSubmit={handleDonationSubmit} className="space-y-4">
                  <input type="number" name="amount" min="1" placeholder="Amount (INR)" required className="w-full border rounded px-4 py-2" value={formData.amount} onChange={handleInputChange} />
                  <select name="paymentMode" value={formData.paymentMode} onChange={handleInputChange} required className="w-full border rounded px-4 py-2">
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="wallet">Wallet</option>
                    <option value="card">Card</option>
                  </select>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                    <span>I accept the terms and conditions</span>
                  </label>
                  <button type="submit" className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600">Proceed to Pay</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">🎉 Thank You!</h2>
            <p className="text-gray-700 mb-2">Your donation of ₹{formData.amount} has been recorded.</p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  document.querySelector('footer').style.display = 'block';
                  setShowThankYou(false);
                }}
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
              >
                Close
              </button>
              <button
                onClick={() => {
                  document.querySelector('footer').style.display = 'block';
                  navigate('/');
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
