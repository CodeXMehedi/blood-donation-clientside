import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className='bg-[#E8F5F0]'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;