import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../hooks/axiosIns';
import { Link } from 'react-router';

const DonationRequest = () => {
   const [allRequest, setAllRequest] = useState([]);
    
    useEffect(() => {
      axiosInstance.get('/all-donation-request')
            // axiosSecure.get('/all-donation-request')
      
            .then(res => {
              setAllRequest(res.data);
            })
    })
  
  return (
    <div className='mb-10'>
      <div className='flex min-h-screen justify-center items-center text-xl' >
        <div className='flex flex-col justify-center items-center'>

          <h3 className='text-4xl font-semibold mt-10 mb-6 text-secondary'>All Blood Donation Requests </h3>
          <div className="overflow-x-auto">
            <table className="table ">
              <thead className='text-lg text-gray-700'>
                <tr>
                  <th>Recipient Name</th>
                  <th>Recipient location</th>
                  <th>Donation date</th>
                  <th>Donation time</th>
                  <th>Blood group </th>
                  <th>Status</th>
                </tr>                                
              </thead>
              <tbody className='text-sm'>
                {allRequest.map((r) => (<tr key={r._id}>

                  <td>{r.requesterName}</td>
                  <td>{r.upazila},{r.district}</td>
                  <td>{r.donationDate}</td>
                  <td>{r.donationTime}</td>
                  <td>{r.bloodGroup}</td>
                  <td>{r.donationStatus}</td>
                  <td><Link to={`/all-donation-request/details//${r?._id}`} className='bg-[#B11226]  p-2 text-white'>View Details</Link>
                  </td>                            
                </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequest;