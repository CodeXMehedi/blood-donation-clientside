import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Featured from '../Components/Featured';
import ContactUs from '../Components/ContactUs';
import Footer from '../Components/Footer';

const RootLayout = () => {
  return (
    <div className='bg-[#E8F5F0]'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Featured></Featured>
      <ContactUs></ContactUs>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;