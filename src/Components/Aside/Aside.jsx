
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  Droplet,
  MapPin,
  FileBarChart,
  LogOut,
  Menu,
  X,
  MenuIcon,
} from 'lucide-react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CgProfile } from "react-icons/cg";



const Aside = () => {
  const { user, logOut } = useContext(AuthContext);
  const [role, setRole] = useState('');
  // const { role } = useContext(AuthContext);
  // console.log(role)
    const axiosSecure = useAxiosSecure();
   const [open, setOpen] = useState(false);
  useEffect(() => {
    axiosSecure.get(`/users/role/${user.email}`)
      .then(res => {

        setRole(res.data.role);
      })
  }, [user,axiosSecure])

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
      <div className="" onClick={() => setOpen(!open)}>
        <div className= "fixed z-50 left-6 top-2">
          {open ? (
            <X className="md:hidden text-black"></X>
          ) : (
            <MenuIcon className="md:hidden text-black"></MenuIcon>
          )}
        </div>
        <ul
          className={`md:hidden  z-40 fixed opacity-60  ${open ? 'left-0' : '-left-full'}   duration-1000 text-black`}
        >
          <aside className="w-64 flex min-h-screen  bg-[#B11226] text-white md:hidden  flex-col">
            <div className="p-6 mt-4 text-2xl font-bold ">Red Blood</div>
            <div className="border-b    border-red-300 text-xl">
              <NavLink
                to={'/dashboard/profile'}
                className={({ isActive }) =>
                  `flex mx-4 my-1 items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
                }
              >
                <CgProfile />
                Profile
              </NavLink>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
                }
              >
                <LayoutDashboard size={20} />
                Dashboard
              </NavLink>

              {role == 'admin' && (
                <NavLink
                  to="/dashboard/all-users"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
                  }
                >
                  <Users size={20} />
                  All Users
                </NavLink>
              )}

              {/* create donation request */}
              <NavLink
                to="/dashboard/create-donation-request"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
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
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
                }
              >
                <Droplet size={20} />
                My Donation Requests
              </NavLink>

              {(role == 'admin' || role == 'volunteer') && (
                <NavLink
                  to="/dashboard/all-donation-request"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
                  }
                >
                  <Droplet size={20} />
                  All donation request
                </NavLink>
              )}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-red-300">
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </aside>
        </ul>
      </div>

      <aside className="w-64 hidden  min-h-screen bg-[#B11226] text-white md:flex flex-col">
        <div className="p-6 text-2xl font-bold ">Red Blood</div>
        <div className="border-b    border-red-300 text-xl">
          <NavLink
            to={'/dashboard/profile'}
            className={({ isActive }) =>
              `flex mx-4 my-1 items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
            }
          >
            <CgProfile />
            Profile
          </NavLink>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          {role == 'admin' && (
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
              }
            >
              <Users size={20} />
              All Users
            </NavLink>
          )}

          {/* create donation request */}
          <NavLink
            to="/dashboard/create-donation-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
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
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
            }
          >
            <Droplet size={20} />
            My Donation Requests
          </NavLink>

          {(role == 'admin' || role == 'volunteer') && (
            <NavLink
              to="/dashboard/all-donation-request"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${isActive ? 'bg-white text-[#B11226]' : 'hover:bg-red-700'}`
              }
            >
              <Droplet size={20} />
              All donation request
            </NavLink>
          )}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-red-300">
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Aside;