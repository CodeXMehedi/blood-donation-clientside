import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Components/Aside/Aside';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen ">
      <Aside></Aside>
      <main className="flex-1 p-6 bg-linear-to-br from-red-100 via-white to-red-100   dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;