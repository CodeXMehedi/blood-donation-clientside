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
import MyDonationRequests from "../Pages/Donor/MyDonationRequests";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Admin/AllUsers";
import AllDonationRequest from "../Pages/Admin/AllDonationRequest";



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
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
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

      },
      {
        path: '/dashboard/my-donation-requests',
        element:<MyDonationRequests></MyDonationRequests>
      },
      {
        path: "/dashboard/all-users",
        element:<AllUsers></AllUsers>
      },
      {
        path: "/dashboard/all-donation-request",
        element:<AllDonationRequest></AllDonationRequest>
      }
    ]
  }
]);