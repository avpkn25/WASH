import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.jpeg';

function Hero() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    dob: '',
    amount: 1
  });

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options = {
        key: 'rzp_test_6obdRLLGIPMsyR', // Replace with your actual Razorpay key
        amount: formData.amount * 100, // Amount in paise
        currency: 'INR',
        name: formData.fullName,
        description: 'Support Clean Water & Hygiene',
        handler: function (response) {
          alert(`✅ Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#f97316'
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true
        },
        config: {
          display: {
            blocks: {
              upi_block: {
                name: "Pay using UPI",
                instruments: [{ method: "upi" }]
              }
            },
            sequence: ["upi_block", "other"],
            preferences: {
              show_default_blocks: true
            }
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('📋 Registered User:', formData);
    setShowForm(false);
    loadRazorpay();
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-[85vh] flex items-center justify-center text-center px-4"
      style={{ backgroundImage: `url(${heroImage})` }} // ✅ Fix: wrap with backticks
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
            onClick={() => setShowForm(true)}
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

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-orange-600">Register to Donate</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="number"
                name="amount"
                placeholder="Donation Amount (INR)"
                value={formData.amount}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600"
              >
                Register & Pay
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
