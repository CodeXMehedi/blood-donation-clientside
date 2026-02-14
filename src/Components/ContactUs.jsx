import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
const ContactUs = () => {
  return (
    <div className="py-10 w-10/12 mx-auto">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-secondary mb-6">
          Contact Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-10">
          Have questions about blood donation? Need urgent support? Our team is
          ready to assist you anytime.
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-800">
              Get in Touch
            </h3>

            <p className="text-gray-600">
              Have questions or need urgent help? Our team is here to assist you
              24/7.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-red-600 text-xl" />
                </div>
                <span className="text-gray-700 font-medium">
                   Dhaka, Bangladesh, 3100
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <FaPhoneAlt className="text-red-600 text-xl" />
                </div>
                <span className="text-gray-700 font-medium">
                  +880 1234-567890
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <FaEnvelope className="text-red-600 text-xl" />
                </div>
                <span className="text-gray-700 font-medium">
                  support@blooddonation.com
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-secondary hover:bg-red-600 text-white font-semibold rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;