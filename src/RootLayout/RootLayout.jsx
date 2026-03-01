import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Featured from '../Components/Featured';
import ContactUs from '../Components/ContactUs';
import Footer from '../Components/Footer';

const RootLayout = () => {
  return (
    <div className="bg-linear-to-br from-red-100 via-white to-red-100   dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Navbar></Navbar>
      <Outlet></Outlet>
      {/* <Featured></Featured>
      <ContactUs></ContactUs> */}
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;