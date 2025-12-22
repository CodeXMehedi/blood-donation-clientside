import { use, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading";
import { axiosInstance } from "../hooks/axiosIns";


const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  const [status,setStatus] = useState('');
  

  useEffect(() => {
    axiosInstance.get(`http://localhost:5000/users/role/${user.email}`)
      .then(res => {
       
        setStatus(res.data.status);
      })
  }, [user])

  // console.log(location)
  if (loading ) {
    return <Loading></Loading>;
  }
  if (!status == 'active') {
    return <Navigate to='/register'></Navigate>
  }
  if (user && user?.email) {
    return children;
  }
  
  return <Navigate state={location.pathname} to='/login'></Navigate>

};
export default PrivateRoute;