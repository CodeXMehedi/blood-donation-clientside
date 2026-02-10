
import React, { use, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});
const useAxiosSecure = () => {
  const { user,logOut } = use(AuthContext);
   const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.log(error);

        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate('/login');
          });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;

// const axiosSecure = axios.create({ baseURL: "https://blood-donation-server-weld.vercel.app/" });

// const useAxiosSecure = () => {
//   const {user} = useContext(AuthContext);

//   useEffect(() => { // only add interceptor when token exists if (!user?.accessToken) return;

//     const requestInterceptor = axiosSecure.interceptors.request.use(
//       (config) => {
//         config.headers.Authorization = `Bearer ${user.accessToken}`;
//         return config;
//       }
//     );

//     const responseInterceptor = axiosSecure.interceptors.response.use(
//       (res) => res,
//       async (error) => {
//         const statusCode = error?.status;

//         if (statusCode === 401 || statusCode === 403) {
//           alert("Forbidden user detected");

//           // await logout();
//           // navigate("/login");
//         }

//         console.log("Axios Secure Error:", error);
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosSecure.interceptors.request.eject(requestInterceptor);
//       axiosSecure.interceptors.response.eject(responseInterceptor);
//     };
//   }, [user?.accessToken]);

//   return axiosSecure;
// };

// export default useAxiosSecure;
