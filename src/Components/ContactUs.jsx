import React from 'react';

const ContactUs = () => {
  return (
    <div>
      {/* 📞 Contact Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Get in Touch
              </h3>
              <p className="text-gray-600">
                If you have any questions or need urgent help, feel free to contact us.
              </p>

              <p className="text-lg">
                📍 <span className="font-semibold">Address:</span> Dhaka, Bangladesh
              </p>
              <p className="text-lg">
                📞 <span className="font-semibold">Phone:</span> +880 1234-567890
              </p>
              <p className="text-lg">
                ✉️ <span className="font-semibold">Email:</span> support@blooddonation.com
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <form className="space-y-4">
                <div>
                  <label className="font-semibold">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="font-semibold">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="font-semibold">Message</label>
                  <textarea
                    placeholder="Write your message..."
                    className="textarea textarea-bordered w-full"
                    rows="4"
                  ></textarea>
                </div>

                <button className="btn bg-[#B11226] w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;