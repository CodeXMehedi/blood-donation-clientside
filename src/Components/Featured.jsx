import React from 'react';

const Featured = () => {
  return (
    <div>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#B11226] mb-10">
            Why Donate Blood?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">🩸</div>
              <h3 className="text-xl font-semibold mb-2">
                Save Lives
              </h3>
              <p className="text-gray-600">
                One blood donation can save up to three lives. Your small effort can make a big difference.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">
                Trusted Volunteers
              </h3>
              <p className="text-gray-600">
                Our trained volunteers manage donation requests and ensure a smooth donation process.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold mb-2">
                Emergency Support
              </h3>
              <p className="text-gray-600">
                Quickly find blood donors during emergencies and critical situations.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Featured;