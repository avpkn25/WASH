import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 px-6 bg-orange-50" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600">Contact Us</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Have questions or want to get involved? We'd love to hear from you.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 p-3 rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 p-3 rounded-md"
          />
          <input
            type="text"
            placeholder="Subject"
            required
            className="w-full border border-gray-300 p-3 rounded-md"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            required
            className="w-full border border-gray-300 p-3 rounded-md resize-none"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
          >
            Send Message
          </button>
          {submitted && (
            <p className="text-green-600 font-medium mt-2">Message sent successfully!</p>
          )}
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 text-gray-700"
        >
          <h3 className="text-xl font-bold text-orange-600">Reach Us At</h3>
          <p>
            <strong>Email:</strong> support@washfoundation.org
          </p>
          <p>
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p>
            <strong>Address:</strong><br />
            WASH Foundation,<br />
            123 Clean Water Street,<br />
            Hyderabad, India.
          </p>
          <div className="mt-4">
            <h4 className="font-semibold text-orange-500">Follow us</h4>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-orange-600 hover:text-orange-800">Facebook</a>
              <a href="#" className="text-orange-600 hover:text-orange-800">Instagram</a>
              <a href="#" className="text-orange-600 hover:text-orange-800">Twitter</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
