import React from 'react';
import Banner from '../Components/Banner';
import Featured from '../Components/Featured';
import ContactUs from '../Components/ContactUs';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="bg-linear-to-br from-red-100 via-white to-red-100 ">
        <Featured></Featured>
        <ContactUs></ContactUs>
      </div>
    </div>
  );
};

export default Home;