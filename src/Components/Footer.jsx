import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#8A0303] text-white">
      <div className="flex flex-col lg:flex-row gap-10 p-10 lg:p-20">

        {/* 🔴 Brand Info */}
        <div className="flex-1 lg:ml-16 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <p className="text-2xl font-bold">BloodCare</p>
          </div>
          <p className="mt-6 text-sm">
            BloodCare is a voluntary blood donation platform connecting donors
            with patients in need. One donation can save multiple lives.
          </p>
          <p className="text-sm text-gray-300 mt-4">
            © {new Date().getFullYear()} BloodCare — All Rights Reserved.
          </p>
        </div>

        {/* 🔗 Useful Links */}
        <div className="flex-1">
          <div className="flex flex-col h-full justify-center items-center gap-2">
            <a href="/">Home</a>
            <a href="/donation-requests">Donation Requests</a>
            <a href="/search">Search Donors</a>
            <a href="/contact">Contact Us</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>

        {/* 🌐 Social & Contact */}
        <div className="flex-1 m-auto text-center">
          <p className="font-semibold">Connect With Us</p>
          <p className="text-sm mt-1">Helpline: +880 1234-567890</p>

          <div className="flex justify-center items-center mt-3 gap-4 text-lg">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
