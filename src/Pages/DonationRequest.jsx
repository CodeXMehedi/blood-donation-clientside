import React, { useEffect, useState } from 'react';


import useAxiosSecure from '../hooks/useAxiosSecure';
import DonationRequestTable from '../Components/DonationRequestTable';
import DonationRequestCard from '../Components/DonationRequestCard';



const DonationRequest = () => {
  const [allRequest, setAllRequest] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
   const [sort, setsort] = useState('size');
   const [order, setOrder] = useState('');
  const limit = 10;

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
   
      .get(
        `/all-donation-request?limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}
      `,
      )
      .then(res => {
        setAllRequest(res.data.result);
        const page = Math.ceil(res.data.total / limit);
        setTotalPage(page);
      });
    
  }, [axiosSecure, currentPage,sort,order]);
  
 const handleSelect = e => {
   console.log(e.target.value);
   const sortText = e.target.value;
   setsort(sortText.split('-')[0]);
   setOrder(sortText.split('-')[1]);
 };

  return (
    <div className="mb-10 ">
      <div className="flex min-h-screen justify-center items-center text-xl">
        <div className="flex flex-col justify-center items-center">
          <h3 className="md:text-4xl text-2xl font-bold mt-10 mb-6 text-[#8a0303]">
            All Blood Donation Requests{' '}
          </h3>

          <div className="">
            <select onChange={handleSelect} className="select bg-white text-gray-600 ">
              <option selected disabled={true}>
                Sort by <span className="text-xs"> D</span>
              </option>
              <option value={'donationTime-asc'}>
                donationTime :  Low to High
              </option>
            </select>
          </div>

          <DonationRequestTable allRequest={allRequest}></DonationRequestTable>
          <DonationRequestCard allRequest={allRequest}></DonationRequestCard>
          <div className="flex justify-center flex-wrap gap-3 py-10">
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn"
              >
                Prev
              </button>
            )}

            {[...Array(totalPage).keys()].map(i => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`btn ${i === currentPage && 'bg-[#b11226]'}`}
              >
                {i + 1}
              </button>
            ))}
            {currentPage < totalPage - 1 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequest;
