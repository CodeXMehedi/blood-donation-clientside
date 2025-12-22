import axios from "axios"; import {  useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";



const axiosSecure = axios.create({ baseURL: "http://localhost:5000" });

const useAxiosSecure = () => {
  const {user} = useContext(AuthContext);
  

  useEffect(() => { // only add interceptor when token exists if (!user?.accessToken) return;

    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const statusCode = error?.status;

        if (statusCode === 401 || statusCode === 403) {
          alert("Forbidden user detected");

          // await logout();
          // navigate("/login");
        }

        console.log("Axios Secure Error:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken]);

  return axiosSecure;
};

export default useAxiosSecure;