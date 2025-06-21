import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// ✅ Import images properly (Vite-compatible)
import campaign1 from '../assets/campaign1.jpg';
import campaign2 from '../assets/campaign2.jpg';
import campaign3 from '../assets/campaign3.jpeg';

const campaigns = [
  {
    title: 'Safe Drinking Water for Villages',
    description: 'Install clean water systems in rural areas lacking proper infrastructure.',
    fullDetails: 'We plan to install bore wells and gravity-fed systems in remote villages where children walk miles for a bucket of water.',
    image: campaign1,
  },
  {
    title: 'Hygiene Awareness in Communities',
    description: 'Educate families on proper handwashing and sanitation practices.',
    fullDetails: 'We organize community workshops with live demonstrations, posters, and hygiene kits to reduce waterborne diseases.',
    image: campaign2,
  },
  {
    title: 'Rainwater Harvesting Systems',
    description: 'Empower schools with rooftop water collection systems.',
    fullDetails: 'These systems provide sustainable water for school use, hygiene, and small-scale agriculture.',
    image: campaign3,
  }
];

function Campaigns() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-16 px-6 bg-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600">Campaigns We Done So Far...</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Join hands with us in bringing clean water, sanitation, and hygiene education to those in need.
        </p>
      </motion.div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000 }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        className="max-w-7xl mx-auto"
      >
        {campaigns.map((campaign, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition duration-300"
            >
              <div className="h-56 bg-gray-200 overflow-hidden">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-orange-700 mb-2">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                <button
                  onClick={() => setSelected(campaign)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold transition duration-300"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-lg">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-2xl"
              onClick={() => setSelected(null)}
            >
              &times;
            </button>
            <img src={selected.image} alt={selected.title} className="rounded-md mb-4" />
            <h3 className="text-2xl font-bold text-orange-600 mb-2">{selected.title}</h3>
            <p className="text-gray-700">{selected.fullDetails}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Campaigns;
