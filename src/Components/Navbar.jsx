import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter, FaYoutube } from 'react-icons/fa6';
import React from 'react';
import { Link, NavLink } from 'react-router';
import { FaPhoneAlt } from 'react-icons/fa';

const Navbar = () => {
  const links = <>
    <div className='text-lg'>
      <NavLink to='/'>Home</NavLink>

    </div>
  </>
  return (
    <>
      <div className="bg-[#B11226]">
        <div className='flex justify-between items-center w-11/12 m-auto py-1 '>
          <div className='flex gap-4 text-white'>
            <p>East Shibgonj, Sylhet, 3100</p>
            <p className='flex items-center gap-1'><FaPhoneAlt />+880-1891-82709</p>
          </div>
          <div className='flex items-center gap-4'>
            <Link className='font-medium p-1 px-2 rounded-sm  bg-[#A8E6A3]'>Login</Link>
            <Link className='font-medium p-1 px-2 rounded-sm  bg-[#A8E6A3]'>Register</Link>

            <a href=""><IoLogoFacebook /></a>
            <a href=""><FaXTwitter /></a>
            <a href=""><FaYoutube /></a>

          </div>
        </div>
      </div>
      {/* second navbar */}
      <div className='bg-gray-100 shadow-sm '>
        <div className="navbar w-10/12 m-auto ">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><a>Item 1</a></li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </li>
                <li><a>Item 3</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost text-2xl font-bold text-[#7A0000]">RED DROP</a>
          </div>
          <div className="navbar-end">
            <ul className="menu menu-horizontal px-1">
              {links}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;