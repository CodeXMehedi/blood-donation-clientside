import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../Contexts/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Link } from 'react-router';


const MyDonationRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const [myRequest, setMyRequest] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const axiosSecure = useAxiosSecure();

  
    useEffect(() => {
      if (!user?.email) return;              
      axiosSecure.get(`/my-donation-request`, {
        params: { email: user?.email }
      })
        .then(res => {
          setMyRequest(res.data);
        })
        .catch(err => {
          console.log(err);
        });

    }, [user?.email]);

  console.log(myRequest)
   
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
  const filteredRequests =
    statusFilter === 'all'
      ? myRequest
      : myRequest.filter(
          r => r.donationStatus?.toLowerCase() === statusFilter.toLowerCase(),
        );

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-3xl font-semibold mb-4 text-primary">
          My Blood Donation Request{' '}
        </h3>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="select select-bordered mb-6"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">Inprogress</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
              {filteredRequests
                .filter(
                  r =>
                    r.donationStatus == 'Inprogress' ||
                    r.donationStatus == 'Done' ||
                    r.donationStatus == 'pending' ||
                    r.donationStatus == 'Cancelled',
                )
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
                            handleDoneCancel(r._id, 'Done');
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
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="btn btn-sm bg-secondary text-white"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/dashboard/edit-request/${r._id}`}
                        className="btn btn-sm bg-sky-500 text-white"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;