import React, {  useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router';


const AllDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [allRequest, setAllRequest] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;

   const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsRes =
          await
          axiosSecure
          
          .get(
          `/all-donation-request?limit=${limit}&skip=${currentPage * limit}`,
        );
        const usersRes = await axiosSecure.get(`/users/by-email?email=${user?.email}`);
          setAllRequest(requestsRes.data.result);
        setUserData(usersRes.data);
         const page = Math.ceil(requestsRes.data.total / limit);
         setTotalPage(page);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[axiosSecure,currentPage])
console.log(userData)
  const handleDoneCancel = async (id, status) => {
   
      try {
      
      await  axiosSecure.patch(
          `/all-donation-request/status?id=${id}&donationStatus=${status}`
        );
        toast.success('Marked as Done');
        const res = await axiosSecure.get(`/all-donation-request`);
        setAllRequest(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
  
    const handleDelete= async(id) => {
      await  axiosSecure.delete(
          `/all-donation-request/delete?id=${id}`,
        );
      toast.success('Deleted');
       const res = await axiosSecure.get(`/all-donation-request`);
  
       setAllRequest(res.data);
  }
  
  const filteredRequests =
    statusFilter === 'all'
      ? allRequest
      : allRequest.filter(
          r => r.donationStatus?.toLowerCase() === statusFilter.toLowerCase(),
        );

  return (
    <div>
      <div className=" flex justify-center items-center min-h-screen ">
        
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-4xl font-semibold mb-8 text-[#8a0303]">
            All Blood Donation Requests{' '}
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
                        {(userData.role === 'admin' ||
                          userData.role === 'volunteer') &&
                          r.donationStatus == 'Inprogress' && (
                            <Link
                              onClick={() => {
                                handleDoneCancel(r._id, 'Done');
                              }}
                              className="btn btn-sm bg-green-400 text-white"
                            >
                              Done
                            </Link>
                          )}
                        {(userData.role === 'admin' ||
                          userData.role === 'volunteer') &&
                          r.donationStatus == 'Inprogress' && (
                            <Link
                              onClick={() => {
                                handleDoneCancel(r._id, 'Cancelled');
                              }}
                              className="btn btn-sm bg-error text-white"
                            >
                              Cancel
                            </Link>
                          )}
                        {userData.role === 'admin' && (
                          <>
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
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-wrap gap-3 lg:py-10">
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

export default AllDonationRequest;