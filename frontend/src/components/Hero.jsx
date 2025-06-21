import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.jpeg';

function Hero() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: 1
  });

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options = {
        key: 'rzp_test_6obdRLLGIPMsyR',
        amount: formData.amount * 100, // Razorpay takes amount in paise
        currency: 'INR',
        name: formData.name,
        description: 'Support Clean Water & Hygiene',
        handler: function (response) {
          alert(`✅ Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: formData.name,
          email: formData.email
        },
        theme: {
          color: '#f97316'
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
    setShowForm(false);
    loadRazorpay();
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-orange-600">Enter Donation Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
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
                type="number"
                name="amount"
                placeholder="Amount (INR)"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600"
              >
                Proceed to Pay
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
