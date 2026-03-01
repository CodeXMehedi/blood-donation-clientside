import React from 'react';
import {  FaHandsHelping, FaHospital, FaTint } from 'react-icons/fa';
const Featured = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="md:py-25 py-20 ">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-bold text-primary dark:text-[#8a0303]  ">
            Every Drop Matters
          </h2>
          <p className="mt-4 text-gray-600 max-w-8/12 mx-auto text-center text-lg dark:text-white">
            Your small act of kindness can become someone's biggest hope. Join
            our community and make a life-saving difference today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 px-6 w-11/12 md:max-w-6xl mx-auto">
          <div className="bg-white rounded p-8 text-center shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-3">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl text-red-700">
                <FaTint></FaTint>
              </span>
            </div>

            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Save Lives
            </h3>
            <p className="text-gray-600">
              One blood donation can save up to three lives. Your small effort
              can make a big difference.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded p-8 text-center shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-3">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-100">
              <span className="text-4xl text-red-600">
                <FaHandsHelping></FaHandsHelping>
              </span>
            </div>

            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Trusted Volunteers
            </h3>
            <p className="text-gray-600">
              Our trained volunteers manage donation requests and ensure a
              smooth donation process.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded p-8 text-center shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-3">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100">
              <span className="text-4xl">🏥</span>
            </div>

            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Emergency Support
            </h3>
            <p className="text-gray-600">
              Quickly find blood donors during emergencies and critical
              situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;