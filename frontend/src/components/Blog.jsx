import React, { useState } from 'react';

// Import local images
import waterChildImg from '../assets/water-child.jpeg';
import schoolHygieneImg from '../assets/school-hygiene.jpeg';
import statsDataImg from '../assets/stats-data.jpeg';

function Blog() {
  const blogData = [
    {
      title: "Clean Water Changed Her Life",
      image: waterChildImg,
      author: "Team WASH",
      date: "June 20, 2025",
      description: "See how clean water access helped transform one girl's education and health.",
      fullText: "Access to clean water drastically changed her life — from daily walks to distant ponds to staying in school and staying healthy. The WASH program provided a safe well near her home and hygiene workshops at her school."
    },
    {
      title: "The Power of Hygiene Education",
      image: schoolHygieneImg,
      author: "Team WASH",
      date: "June 15, 2025",
      description: "How hygiene training in rural schools is reducing illness and absenteeism.",
      fullText: "Basic hygiene practices such as handwashing have reduced illness in rural schools by over 40%. WASH's school kits and training empower students to spread knowledge to their families and communities."
    },
    {
      title: "WASH Impact in Numbers",
      image: statsDataImg,
      author: "WASH Research",
      date: "June 10, 2025",
      description: "A look at the measurable impact of our latest clean water campaigns.",
      fullText: "Over the past year, 50+ villages received access to clean water. Our impact reports show a 60% drop in waterborne diseases and improved school attendance, especially for girls."
    }
  ];

  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-sky-700 mb-12">Stories That Inspire Change</h2>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[1fr]">
          {blogData.map((post, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
            >
              <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-sky-700 mb-2">{post.title}</h3>
                <p className="text-xs text-gray-500 mb-2">By {post.author} | {post.date}</p>
                <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-sky-600 hover:text-white border border-sky-500 hover:bg-sky-500 px-4 py-2 rounded transition"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-sky-600 hover:text-red-600 font-bold text-xl"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-56 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-bold text-sky-700 mb-2">{selectedPost.title}</h3>
            <p className="text-sm text-gray-500 mb-4">By {selectedPost.author} | {selectedPost.date}</p>
            <p className="text-gray-700">{selectedPost.fullText}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Blog;
