// File: src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/aboutus.jpeg';
import team1 from '../assets/team1.jpeg';
import team2 from '../assets/team2.jpeg';
import team3 from '../assets/team3.jpeg';
import team4 from '../assets/team4.jpg'; // ✅ Add your 4th team member image here

function About() {
  return (
    <div className="bg-white" id="about">
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-4">
              We Can Donate for a Better Future
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              At <span className="font-semibold text-orange-600">WASH</span>, we believe in collective action to create sustainable change. Our focus is on clean water, sanitation, and hygiene in underserved communities.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300">
              More About Us
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={aboutImage} alt="About WASH" className="w-full rounded-lg shadow-md" />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-orange-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/src/assets/timeline.jpeg" // ✅ Update to use import if needed
              alt="Jaldhaara Journey"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </motion.div>

          <div className="space-y-10">
            <h3 className="text-3xl font-bold text-orange-600 mb-6">Our Journey</h3>
            {[
              { year: '2014', text: 'Jaldhaara was founded with a vision to serve 2000+ villages.' },
              { year: '2017', text: 'Partnered with local NGOs to expand hygiene education.' },
              { year: '2020', text: 'Launched rainwater harvesting systems in drought areas.' },
              { year: '2024', text: 'Reached 1 million lives through WASH initiatives.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-8 border-l-4 border-orange-400"
              >
                <div className="absolute -left-4 top-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                <h4 className="text-xl font-semibold text-orange-700">{item.year}</h4>
                <p className="text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-orange-100 p-6 rounded-lg shadow-md"
          >
            <h4 className="text-xl font-bold text-orange-700 mb-3">Our Mission</h4>
            <p className="text-gray-700">
              To improve lives through sustainable water, sanitation, and hygiene solutions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-orange-100 p-6 rounded-lg shadow-md"
          >
            <h4 className="text-xl font-bold text-orange-700 mb-3">Our Vision</h4>
            <p className="text-gray-700">
              A world where every community has access to safe water and hygiene facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-orange-50 py-16 px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-orange-600">Meet the Team</h3>
          <p className="text-gray-600">Dedicated individuals powering our mission forward.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[team1, team2, team3, team4].map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md text-center p-4"
            >
              <img src={img} alt={`Team member ${idx + 1}`} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
              <h4 className="text-orange-700 font-bold text-lg">Team Member {idx + 1}</h4>
              <p className="text-sm text-gray-600">Role at WASH Foundation</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
