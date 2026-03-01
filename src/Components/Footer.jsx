import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import bloodDonationLogo from '../assets/bloodlogo.jpg'
import { Link } from 'react-router';
const Footer = () => {
  return (
    <div className="bg-[#8a0303] dark:bg-[bg-[#8a0303]] text-white text-lg">
      <div className="flex flex-col lg:flex-row gap-10 p-10 lg:p-20">
        <div className="flex-1 lg:ml-16 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
              <img
                className="w-10 h-10 rounded"
                src={bloodDonationLogo}
                alt=""
              />
              Red Drop
            </Link>
          </div>
          <p className="mt-6 ">
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

            <a href="/privacy-policy">Privacy Policy</a>
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
