import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="bg-cover bg-center bg-no-repeat min-h-[70vh] flex flex-col justify-center items-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://i.ibb.co.com/cS5HKHwD/luann-hunt-X20g2-GQs-Vd-A-unsplash.jpg')",
      }}>
      <h1 className='text-[#8A0303] text-center font-bold text-4xl py-8'>Your Blood <br />Can Give Someone a Second Chance</h1>
      <h2 className='text-[#B11226] text-center font-semibold text-3xl my-4'>Join the Blood Donation Movement</h2>
      <div className='flex gap-4 justify-center my-16'>
        <Link to='/register' className=" text-center bg-[#B11226] w-50 text-white text-lg p-2">Join as a Donor</Link>
        <Link className=" text-center bg-[#B11226] w-50 text-white text-lg p-2">Search Donors</Link>
      </div>
    </div>
  );
};

export default Banner;