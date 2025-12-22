import React, { use, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { GoogleAuthProvider } from 'firebase/auth';
import { Eye, EyeClosed } from 'lucide-react';
import toast from 'react-hot-toast';
import DocumentMeta from 'react-document-meta';




const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();
  const {  signInUser} = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const meta = {
    title: "Login | Blood Donation",
    description: "Create an account on Blood Donation to become a donor, request blood, and help save lives in your community.",
    meta: {
      charset: "utf-8",
      name: {
        keywords: "blood donation, donate blood, blood donor, blood request, save lives, donor registration"
      }
    }
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });
    signInUser(email, password)
      .then(() => {
        // const user = result.user;
        // console.log(user);
        toast.success("Login Successful");
        navigate(`${location.state ? location.state : "/"}`)
        navigateTo("/");


      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        setError(errorCode);
      });

  }

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }


  return (
    <DocumentMeta {...meta}>
      <div className='flex justify-center items-center  lg:min-h-screen '>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-2 border-[#B11226]  ">
          <h2 className='bg-[#B11226] p-4 text-center font-semibold text-2xl text-white '>Login Your Account</h2>
          <form onSubmit={handleLogIn} className="card-body ">
            <fieldset className="fieldset text-lg">

              <label className="label">Email</label>
              <input name='email'
                type="email"
                onChange={(e) => setLoginEmail(e.target.value)} className="input" placeholder="Email"
                required />

              <label className="label">Password</label>
              <div className='relative'>
                <input name='password'
                  type={showPassword ? 'text' : "password"}
                  className="input"
                  placeholder="Password"
                  required />
                <button
                  onClick={handleTogglePasswordShow}
                  className='absolute right-8 top-2'>
                  {showPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                </button>
              </div>

              <div><NavLink to="/auth/forgot-password"
                state={{ email: loginEmail }}
                className="link link-hover">Forgot password?</NavLink></div>
              {error && <p className="text-red-800 ">{error}</p>}
              <div className='flex justify-center  mt-4'>
                <button type='submit' className=" bg-[#B11226] w-1/3 text-white text-lg p-2">Login</button>
              </div>
              <p className='font-semibold text-lg text-center pt-5'>Don't have an account? <NavLink to='/register' className="text-red-500">Register</NavLink></p>
            </fieldset>
          </form>
        </div>
      </div>
    </DocumentMeta>
  );
};

export default Login;