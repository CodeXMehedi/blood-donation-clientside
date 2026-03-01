import React from 'react';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {

  const handleContact = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully !');    
    e.target.reset();
  }
  return (
    <div className="pb-20 md:pb-25 w-10/12 mx-auto">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-5xl font-bold text-center text-primary dark:text-[#8a0303] mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-16 dark:text-white">
          Have questions about blood donation? Need urgent support? Our team is
          ready to assist you anytime.
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-3 text-[#8a0303]">
              Get in Touch
            </h3>

            <p className="text-gray-600 text-lg dark:text-white ">
              Have questions or need urgent help? Our team is here to assist you
              24/7.
            </p>

            <div className="space-y-4 ">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-red-600 text-xl" />
                </div>
                <span className="text-gray-600 not-only-of-type text-sm font-medium dark:text-white">
                  Dhaka, Bangladesh, 3100
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <FaPhoneAlt className="text-red-600 text-xl" />
                </div>
                <span className="text-gray-600 text-sm font-medium dark:text-white">
                  +880 1234-567890
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <FaEnvelope className="text-red-600 text-xl" />
                </div>
                <span className="text-gray-600 text-sm font-medium dark:text-white">
                  support@blooddonation.com
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white/80 dark:bg-gray-400 backdrop-blur-lg p-10 rounded shadow-2xl">
            <form onSubmit={handleContact} className="space-y-6">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full p-4 rounded border focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full p-4 rounded border focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <textarea
                  rows="4"
                  required
                  placeholder="Write your message..."
                  className="w-full p-4 rounded border focus:outline-none focus:ring-2 focus:ring-red-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#b11226] cursor-pointer  text-white font-semibold rounded transition duration-300 shadow-lg hover:shadow-xl text-lg"
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