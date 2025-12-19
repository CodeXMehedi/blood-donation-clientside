import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DashboardLayout from "../DashboardLayout.jsx/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard";
import Profile from "../Pages/Dashboard/Profile";
import DonorHomePage from "../Pages/Donor/DonorHomePage";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      }

    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <DonorHomePage></DonorHomePage>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: '/dashboard/create-donation-request',
        element:<CreateDonationRequest></CreateDonationRequest>

      }
    ]
  }
]);