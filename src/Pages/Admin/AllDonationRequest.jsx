import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../hooks/axiosIns';

const AllDonationRequest = () => {
  const [allRequest, setAllRequest] = useState([]);
  ///
  useEffect(() => {
    axiosInstance.get('/all-donation-request')
          // axiosSecure.get('/all-donation-request')
    
          .then(res => {
            setAllRequest(res.data);
          })
  })

  return (
    <div>
      <div className='flex min-h-screen justify-center items-center' >
        <div className='flex flex-col justify-center items-center'>

          <h3 className='text-xl font-semibold mb-4'>All Blood Donation Requests </h3>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Recipient location</th>
                  <th>Donation date</th>
                  <th>Donation time</th>
                  <th>Blood group </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allRequest.map((r) => (<tr key={r._id}>

                  <td>{r.requesterName}</td>
                  <td>{r.upazila},{r.district}</td>
                  <td>{r.donationDate}</td>
                  <td>{r.donationTime}</td>
                  <td>{r.bloodGroup}</td>
                  <td>{r.donationStatus}</td>
                  <td>Blue</td>
                </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDonationRequest;