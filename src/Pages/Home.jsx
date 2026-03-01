import React from 'react';
import Banner from '../Components/Banner';
import Featured from '../Components/Featured';
import ContactUs from '../Components/ContactUs';
import HowItWorks from './HomeComponents/HowItWorks';
import FAQ from './HomeComponents/FAQ';
import HomeDonationPreview from './HomeComponents/HomeDonationPreview';
import Newsletter from './HomeComponents/NewsLetter';
import Partners from './HomeComponents/Partners';
import FundingSection from './HomeComponents/FundingSection';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="">
        <Featured></Featured>
        <HowItWorks></HowItWorks>
        <HomeDonationPreview></HomeDonationPreview>

        <Partners></Partners>
        <FundingSection></FundingSection>
        <Newsletter></Newsletter>
        <FAQ></FAQ>
        <ContactUs></ContactUs>
      </div>
    </div>
  );
};

export default Home;