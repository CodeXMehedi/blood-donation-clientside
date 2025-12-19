import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter, FaYoutube } from 'react-icons/fa6';
import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaPhoneAlt } from 'react-icons/fa';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';
import userDefaultLogo from '../assets/logouser-D4eLv0KQ.jpg'

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [isChecked, setIsChecked] = useState(false);
  const handleLogOut = () => {

    logOut()
      .then(() => {
        toast.success("Logged Out successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTheme = () => {
    setIsChecked(prev => !prev);
  };
  useEffect(() => {
    const theme = isChecked ? "dark" : 'light';
    document.documentElement.setAttribute("data-theme", theme);
  }, [isChecked]);

  const links = <>
    <div className='text-lg font-semibold text-[#8A0303] flex gap-4 items-center'>
      <NavLink  to='/'>Home</NavLink>
      <NavLink to='/'>Donation Request</NavLink>
      <NavLink to='/'>Funding</NavLink>
      
      {user && (
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={user?.photoURL || "https://i.ibb.co/5r5mJjH/user.png"}
                title={user?.displayName}
                alt="user avatar"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li>
              <NavLink to="/dashboard" className='font-medium p-2 px-2 rounded-sm  bg-[#EF4444] mb-1 '>Dashboard</NavLink>
            </li>
            <li>
              <button onClick={handleLogOut} className='font-medium p-2 px-2 rounded-sm  bg-[#EF4444]'>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  </>
  return (
    <>
      <div className="bg-[#8A0303]">
        <div className='flex justify-between items-center w-11/12 m-auto py-1'>
          <div className='flex gap-4 text-white'>
            <p>East Shibgonj, Sylhet, 3100</p>
            <p className='flex items-center gap-1'><FaPhoneAlt />+880-1891-82709</p>
          </div>

          <div className='flex items-center gap-4'>
            <div className=" flex items-center  gap-2 ">
              <label className="flex cursor-pointer gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path
                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input onClick={handleTheme} type="checkbox" value="synthwave" className="toggle theme-controller" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
              {!user && <img
                className='w-9 h-9 rounded-4xl'
                src={!user && userDefaultLogo}
                title={'User name'}
                alt=""
              />
              }
              {!user && (
                <div className='flex gap-2'>
                    <Link to='/login' className='font-medium p-1 px-2 rounded-sm   bg-[#EF4444]'>Login</Link>
                    {/* <Link to='/register' className='font-medium p-1 px-2 rounded-sm  bg-[#EF4444]'>Register</Link> */}
                </div>
              )}
            </div>
            <a className="text-white" href=""><IoLogoFacebook /></a>
            <a className="text-white" href=""><FaXTwitter /></a>
            <a className="text-white" href=""><FaYoutube /></a>

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