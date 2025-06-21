import React from 'react';
import CountUp from 'react-countup';

function Stats() {
  const stats = [
    { number: 326, label: 'Total Campaigns' },
    { number: 25, label: 'Total Fund Raised (Lakhs)' },
    { number: 125, label: 'Happy Volunteers' },
    { number: 15, label: 'Years of Service' },
  ];

  return (
    <section className="bg-orange-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
          Our Journey in Numbers
        </h2>
        <p className="text-gray-600 text-lg">
          We’ve been working hard to bring clean water and hope to communities in need.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
          >
            <h3 className="text-4xl font-extrabold text-orange-500">
              <CountUp
                start={1}
                end={stat.number}
                duration={1.5}
                enableScrollSpy
              />
            </h3>
            <p className="mt-2 text-gray-700 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
