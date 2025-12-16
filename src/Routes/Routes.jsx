import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element:<Home></Home>
      },
      {
        path: '/register',
        element:<Register></Register>
      }
    ]
  }
]);