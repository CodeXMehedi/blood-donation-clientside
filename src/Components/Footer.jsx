import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className="bg-primary text-white">
      <div className="flex flex-col lg:flex-row gap-10 p-10 lg:p-20">
        <div className="flex-1 lg:ml-16 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <p className="text-3xl font-bold">Red Drop</p>
          </div>
          <p className="mt-6 text-sm">
            BloodCare is a voluntary blood donation platform connecting donors
            with patients in need. One donation can save multiple lives.
          </p>
          <p className="text-sm text-gray-300 mt-4">
            © {new Date().getFullYear()} BloodCare — All Rights Reserved.
          </p>
        </div>

        <div className="flex-1">
          <div className="flex flex-col h-full justify-center items-center gap-2">
            <a href="/">Home</a>
            <a href="/all-donation-request">Donation Requests</a>
            <a href="/search-donors">Search Donors</a>
            <a href="">Contact Us</a>
            <a href="">Privacy Policy</a>
          </div>
        </div>

        <div className="flex-1 m-auto text-center">
          <p className="font-semibold">Connect With Us</p>
          <p className="text-sm mt-1">Helpline: +880 1234-567890</p>

          <div className="flex justify-center items-center mt-3 gap-4 text-lg">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="hover:text-gray-300 transition" />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="hover:text-gray-300 transition" />
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="hover:text-gray-300 transition" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
