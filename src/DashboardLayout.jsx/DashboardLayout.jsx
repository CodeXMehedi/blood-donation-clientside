import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Components/Aside/Aside';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Aside></Aside>
       <main className="flex-1 p-6">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;