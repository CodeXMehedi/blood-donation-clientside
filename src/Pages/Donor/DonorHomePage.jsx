import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const DonorHomePage = () => {
  const { user, loading } = useContext(AuthContext);
  const [myRequests, setMyRequest] = useState([]);
  const axiosSecure = useAxiosSecure();
  const myRequest = myRequests.slice(0, 3);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/my-donation-request`, { params: { email: user.email } })
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
  const handleDoneCancel = async (id,status) => {
    try {
    
    await  axiosSecure.patch(
        `/my-donation-request/status?id=${id}&donationStatus=${status}`,
      );
      toast.success('Marked as Done');
      const res = await axiosSecure.get(`/my-donation-request`, {
        params: { email: user.email },
      });

      setMyRequest(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const handleDelete= async(id) => {
    await  axiosSecure.delete(
        `/my-donation-request/delete?id=${id}`,
      );
    toast.success('Deleted');
     const res = await axiosSecure.get(`/my-donation-request`, {
       params: { email: user.email },
     });

     setMyRequest(res.data);
  }
  

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="text-4xl font-semibold text-[#8A0303] mb-8">
            Welcome ! {user?.displayName} <br />{' '}
            <p className="mt-4 text-center  text-xl text-[#B11226]">
              Your donation has the power to give someone a second chance at
              life.
            </p>
          </h1>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          My Recent donation requests{' '}
        </h3>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myRequest
                .filter(r => r.donationStatus == 'Inprogress' || r.donationStatus=='Done' || r.donationStatus=='Cancelled')
                .map(r => (
                  <tr key={r._id}>
                    <td>{r.requesterName}</td>
                    <td>
                      {r.upazila},{r.district}
                    </td>
                    <td>{r.donationDate}</td>
                    <td>{r.donationTime}</td>
                    <td>{r.bloodGroup}</td>
                    <td>{r.donationStatus}</td>
                    <td className="flex gap-2">
                      {r.donationStatus == 'Inprogress' && (
                        <Link
                          onClick={() => {
                           handleDoneCancel(r._id,'Done');
                          }}
                          className="btn btn-sm bg-green-400 text-white"
                        >
                          Done
                        </Link>
                      )}
                      {r.donationStatus == 'Inprogress' && (
                        <Link
                          onClick={() => {
                            handleDoneCancel(r._id, 'Cancelled');
                          }}
                          className="btn btn-sm bg-error text-white"
                        >
                          Cancel
                        </Link>
                      )}
                      <button onClick={()=>handleDelete(r._id)} className='btn btn-sm bg-secondary text-white'>Delete</button>
                      <Link to={`/dashboard/edit-request/${r._id}`} className='btn btn-sm bg-sky-500 text-white'>Edit</Link>
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Link
          to="/dashboard/my-donation-requests"
          className=" text-center bg-[#B11226] w-50 text-white text-lg p-2 mt-6"
        >
          View my all request
        </Link>
      </div>
    </div>
  );
};

export default DonorHomePage;
