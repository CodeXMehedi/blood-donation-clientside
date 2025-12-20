import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../Contexts/AuthContext';


const MyDonationRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const [myRequest, setMyRequest] = useState([]);
  const axiosInstance = useAxios();

  
    useEffect(() => {
      if (!user?.email) return;              
      axiosInstance.get(`/my-donation-request`, {
        params: { email: user?.email }
      })
        .then(res => {
          setMyRequest(res.data);
        })
        .catch(err => {
          console.log(err);
        });

    }, [user?.email]);

  
   
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Please login first</p>;
  }
  return (
    <div className='flex min-h-screen justify-center items-center' >
      <div className='flex flex-col justify-center items-center'>
        
        <h3 className='text-xl font-semibold mb-4'>My Blood Donation Requests </h3>
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
              {myRequest.map((r) => (<tr key={r._id}>

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
  );
};

export default MyDonationRequests;