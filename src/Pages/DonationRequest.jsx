import React, { useEffect, useState } from 'react';


import useAxiosSecure from '../hooks/useAxiosSecure';
import DonationRequestTable from '../Components/DonationRequestTable';
import DonationRequestCard from '../Components/DonationRequestCard';

const DonationRequest = () => {
  const [allRequest, setAllRequest] = useState([]);

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get('/all-donation-request')
      // axiosSecure.get('/all-donation-request')

      .then(res => {
        setAllRequest(res.data);
      });
  }, [axiosSecure]);

  return (
    <div className="mb-10 ">
      <div className="flex min-h-screen justify-center items-center text-xl">
        <div className="flex flex-col justify-center items-center">
          <h3 className="md:text-4xl text-2xl font-semibold mt-10 mb-6 text-secondary">
            All Blood Donation Requests{' '}
          </h3>
          <DonationRequestTable allRequest={allRequest}></DonationRequestTable>
          <DonationRequestCard allRequest={allRequest
          }></DonationRequestCard>
        </div>
      </div>
    </div>
  );
};

export default DonationRequest;
