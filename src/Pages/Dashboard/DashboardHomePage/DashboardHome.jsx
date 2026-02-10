import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import AdminHomePage from '../../Admin/AdminHomePage'
import DonorHomePage from '../../Donor/DonorHomePage';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/users/by-email?email=${user?.email}`).then(res => {
      console.log(res.data);
      setUserData(res.data);
    });
    
  },[user?.email,axiosSecure])
console.log(userData)
   if (userData?.role === 'admin' || userData?.role === 'volunteer') {
     return <AdminHomePage></AdminHomePage>;
   }

   if (userData?.role === 'donor') {
     return <DonorHomePage />;
   }

   return <div>No Role Found</div>;
};

export default DashboardHome;