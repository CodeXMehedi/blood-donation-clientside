import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminHomePage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
      
        const usersRes = await axiosSecure.get('/users');
        const fundingRes = await axiosSecure.get('/funding');
        const requestsRes = await axiosSecure.get('/all-donation-request');

      
        setTotalUsers(usersRes.data);
        setTotalFunding(fundingRes.data);
        setTotalRequests(requestsRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Call the async function
  }, [axiosSecure]);

  return (
    <div className="flex min-h-screen justify-center items-center w-11/12 mx-auto">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="font-bold md:text-4xl text-2xl  text-[#8A0303] mb-8">
            Welcome ! {user?.displayName} <br />{' '}
            <p className="mt-4 text-center  text-lg text-[#B11226]">
              Your donation has the power to give someone a second chance at
              life.
            </p>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {/* Card 1 */}
          <div className="bg-[#b11226] shadow-xl rounded-lg p-12 flex items-center gap-4 transition duration-500 hover:-translate-y-2">
            <div className="bg-blue-100 text-blue-600 p-6 rounded-full text-2xl">
              👤
            </div>
            <div>
              <p className="text-white  text-xl">Total Users</p>
              <h2 className="text-2xl font-semibold">{totalUsers.length}</h2>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#b11226] shadow-xl rounded-lg p-12 flex items-center gap-4 transition duration-500 hover:-translate-y-2">
            <div className="bg-green-100 text-green-600 p-6 rounded-full text-2xl">
              💰
            </div>
            <div>
              <p className="text-white text-xl">Total Funding</p>
              <h2 className="text-2xl font-semibold">{totalFunding.length}</h2>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#b11226] shadow-xl rounded-lg p-12 flex items-center gap-4 transition duration-500 hover:-translate-y-2">
            <div className="bg-red-100 text-red-600 p-6 rounded-full text-2xl">
              🩸
            </div>
            <div>
              <p className="text-white text-lg">Blood Requests</p>
              <h2 className="text-2xl font-semibold">{totalRequests.length}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;