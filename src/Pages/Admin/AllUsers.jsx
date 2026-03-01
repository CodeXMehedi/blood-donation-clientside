import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../Contexts/AuthContext';
// import { axiosInstance } from '../../hooks/axiosIns';
import useAxiosSecure from '../../hooks/useAxiosSecure';

// import useAxiosSecure from '../../hooks/useAxiosSecure'

const AllUsers = () => {
  // const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;

  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const fetchUsers = () => {
    axiosSecure
      .get(
        `/users?limit=${limit}&skip=${currentPage * limit}`,
      )
      // axiosSecure.get('/users')

      .then(res => {
        setUsers(res.data.result);
        console.log(res.data)
        const page = Math.ceil(res.data.total / limit);
        setTotalPage(page);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, [user,currentPage]);

  const handleStatus = (email, status) => {
    axiosSecure
      .patch(`/user/update/status?email=${email}&status=${status}`)
      .then(res => {
        console.log(res.data);
        fetchUsers();
      });
  };

  const handleRole = (email, role) => {
    axiosSecure
      .patch(`/user/update/role?email=${email}&role=${role}`)
      .then(res => {
        console.log(res.data);
        fetchUsers();
      });
  };

  return (
    <div>
      <h2 className="font-bold md:text-4xl text-2xl text-[#b11226] text-center my-10">
        Red Drop Users
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-lg">
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th>User Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map(user => (
              <tr>
                <th>
                  
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.imageUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user?.role}</td>
                <td>{user?.status}</td>
                <th>
                  <div className="flex gap-2 text-white">
                    {
                      // && user?.role === 'donor'
                      user?.role !== 'admin' &&
                        (user?.status !== 'active' ? (
                          <button
                            onClick={() => handleStatus(user?.email, 'active')}
                            className="btn bg-green-400 btn-xs"
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatus(user?.email, 'blocked')}
                            className="btn btn-error btn-xs"
                          >
                            Block
                          </button>
                        ))
                    }
                    {user?.role == 'donor' && user?.status == 'active' && (
                      <button
                        onClick={() => handleRole(user?.email, 'volunteer')}
                        className="btn btn-info btn-xs"
                      >
                        Make Volunteer
                      </button>
                    )}

                    {user?.role !== 'admin' &&
                      (user?.role == 'donor' || user?.role == 'volunteer') &&
                      user?.status == 'active' && (
                        <button
                          onClick={() => handleRole(user?.email, 'admin')}
                          className="btn btn-warning btn-xs"
                        >
                          Make Admin
                        </button>
                      )}
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AllUsers;
