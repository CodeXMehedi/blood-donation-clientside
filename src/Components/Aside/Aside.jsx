
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  Droplet,
  MapPin,
  FileBarChart,
  LogOut
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";



const Aside = () => {
  const { user,logOut } = useContext(AuthContext);
  const [role, setRole] = useState('');
  // const { role } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/role/${user.email}`)
      .then(res => {
       
        setRole(res.data.role);
      })
  }, [user])
  
  const handleLogOut = () => {
  
      logOut()
        .then(() => {
          toast.success("Logged Out successful");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  

  return (

    <>

      <aside className="w-64 min-h-screen bg-[#B11226] text-white flex flex-col">


        <div className="p-6 text-2xl font-bold border-b border-red-300">
          Red Blood
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          <NavLink
            to="/dashboard/create-donation-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? "bg-white text-[#B11226]" : "hover:bg-red-700"}`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

        
          {
            role == 'admin' && (
              <NavLink
                to="/dashboard/all-users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? "bg-white text-[#B11226]" : "hover:bg-red-700"}`
                }
              >
                <Users size={20} />
                All Users
              </NavLink>
            )
            }
           
          {/* create donation request */}
          <NavLink
            to="/dashboard/create-donation-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? "bg-white text-[#B11226]" : "hover:bg-red-700"}`
            }
          >
            <Droplet size={20} />
            Create Donation Request
          </NavLink>
          {/* My donation request */}
          <NavLink
            to="/dashboard/my-donation-requests"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? "bg-white text-[#B11226]" : "hover:bg-red-700"}`
            }
          >
            <Droplet size={20} />
            My Donation Requests
          </NavLink>

          <NavLink
            to="/admin/districts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? "bg-white text-[#B11226]" : "hover:bg-red-700"}`
            }
          >
            <MapPin size={20} />
            Districts
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? "bg-white text-[#B11226]" : "hover:bg-red-700"}`
            }
          >
            <FileBarChart size={20} />
            Reports
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-red-300">
          <button onClick={handleLogOut} className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-700 transition">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

    </>

  );
};

export default Aside;