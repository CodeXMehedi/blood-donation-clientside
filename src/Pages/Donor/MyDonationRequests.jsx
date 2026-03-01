import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../Contexts/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const MyDonationRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const [myRequest, setMyRequest] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/my-donation-request/?limit=${limit}&skip=${currentPage * limit}`, {
        params: { email: user?.email },
      })
      .then(res => {
        setMyRequest(res.data.result);
         const page = Math.ceil(res.data.total / limit);
         setTotalPage(page);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user?.email,currentPage]);

  console.log(myRequest);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Please login first</p>;
  }
  const handleDoneCancel = async (id, status) => {
    try {
      await axiosSecure.patch(
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

  const handleDelete = async id => {
    await axiosSecure.delete(`/my-donation-request/delete?id=${id}`);
    toast.success('Deleted');
    const res = await axiosSecure.get(`/my-donation-request`, {
      params: { email: user.email },
    });

    setMyRequest(res.data);
  };
  const filteredRequests =
    statusFilter === 'all'
      ? myRequest
      : myRequest.filter(
          r => r.donationStatus?.toLowerCase() === statusFilter.toLowerCase(),
        );

  return (
    <div>
      <div className="flex  justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-bold  md:text-4xl text-2xl  mb-4 text-[#8a0303]">
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
                <tr className="text-lg">
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
  );
};

export default MyDonationRequests;
