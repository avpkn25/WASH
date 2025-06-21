import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import event1 from '../assets/event1.jpeg';
import event2 from '../assets/event2.jpg';
import event3 from '../assets/event3.jpeg';

const events = [
  {
    title: 'Water Awareness Drive',
    description:
      'Educating rural communities about water conservation and hygiene practices through engaging sessions.',
    image: event1,
    date: 'June 25, 2025',
  },
  {
    title: 'Sanitation Kit Distribution',
    description:
      'We distribute hygiene kits to underprivileged families, helping them maintain cleanliness and health.',
    image: event2,
    date: 'July 10, 2025',
  },
  {
    title: 'Community Cleanup Day',
    description:
      'Volunteers come together to clean up local water bodies and public spaces to promote environmental care.',
    image: event3,
    date: 'July 25, 2025',
  },
];

function UpcomingEventsAlternate() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <section className="py-16 px-6 bg-white overflow-hidden">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600">Join Our Upcoming Events</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Be part of the change by participating in our upcoming drives and initiatives.
        </p>
      </motion.div>

      {/* Event Cards */}
      <div className="max-w-6xl mx-auto space-y-20">
        {events.map((event, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <motion.img
                src={event.image}
                alt={event.title}
                className="rounded-lg shadow-md w-full object-cover"
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 border-l-4 border-orange-400 pl-6"
            >
              <p className="text-sm text-gray-500 mb-1">{event.date}</p>
              <h3 className="text-2xl font-bold text-orange-600 mb-3">{event.title}</h3>
              <p className="text-gray-700 text-lg mb-4">{event.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedEvent(event)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md shadow transition"
              >
                Join Now
              </motion.button>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Modal with Form */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
              >
                &times;
              </button>

              {submitted ? (
                <motion.div
                  className="text-center py-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-green-600 mb-2">Thanks for joining!</h3>
                  <p className="text-gray-700">We’ll reach out to you soon.</p>
                </motion.div>
              ) : (
                <>
                  <motion.h3
                    className="text-2xl font-bold text-orange-600 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {selectedEvent.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-gray-500 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedEvent.date}
                  </motion.p>
                  <motion.p
                    className="text-gray-700 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedEvent.description}
                  </motion.p>

                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.1 } },
                    }}
                  >
                    {['Your Name', 'Your Email', 'Your Location'].map((placeholder, i) => (
                      <motion.input
                        key={placeholder}
                        type={placeholder === 'Your Email' ? 'email' : 'text'}
                        placeholder={placeholder}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      />
                    ))}
                    <motion.button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-md font-semibold"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Submit
                    </motion.button>
                  </motion.form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default UpcomingEventsAlternate;
