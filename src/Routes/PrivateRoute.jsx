import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useLocation } from "react-router";



const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  // console.log(location)
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to='/login'></Navigate>

};
export default PrivateRoute;