import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { use, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { Eye, EyeClosed } from 'lucide-react';
import toast from 'react-hot-toast';
import DocumentMeta from 'react-document-meta';

const googleProvider = new GoogleAuthProvider();
const Register = () => {

  const meta = {
    title: "Register | Blood Donation",
    description: "Create an account on Blood Donation to become a donor, request blood, and help save lives in your community.",
    meta: {
      charset: "utf-8",
      name: {
        keywords: "blood donation, donate blood, blood donor, blood request, save lives, donor registration"
      }
    }
  };

  const { createUser, setUser, updateUser, signInWithGoogle, user } = use(AuthContext);

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    if (name.length < 5) {
      setError("Name should be more then 5 character");
      return;
    }
    else {
      setError('');
    }
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ name, photo, email, password });

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError('Password must be at least 6 characters long, and include at least one uppercase, one lowercase, and one special character');
      return
    }
    createUser(email, password).then((result) => {
      const user = result.user;

      updateUser({ displayName: name, photoURL: photo })
        .then(() => {

          setUser({ ...user, displayName: name, photoURL: photo });
          toast.success("Register Successful");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setUser(user);
        });


    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode && errorMessage) {
        toast.error(errorMessage, errorCode);
      }

    });

  }
  const handleGoogleSignIn = () => {

    signInWithGoogle(googleProvider)
      .then(result => {
        // console.log(result.user);
        setUser(result.user);
        toast.success("Register Successful");
        navigate("/");


      })
      .catch(error => {
        console.log(error)
      })

  }

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  return (
    <DocumentMeta {...meta}>
      <div className='flex justify-center items-center  lg:min-h-screen bg-[#E8F5F0] my-6'>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl  border-2 border-[#B11226]">
          <h2 className='bg-[#B11226] p-4 text-center font-semibold text-2xl text-white '>Register Your Account</h2>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input name='name' type="text" className="input" placeholder="Name" required />

              <label className="label">Photo URL</label>
              <input name='photo' type="text" className="input" placeholder="Photo URL" required />

              <label className="label">Email</label>
              <input name='email' type="email" className="input" placeholder="Email" required />

              <div className='relative'>
                <label className="label">Password</label>
                <input
                  name='password'
                  type={showPassword ? 'text' : "password"}
                  className="input"
                  placeholder="Password"
                  required />
                <button
                  onClick={handleTogglePasswordShow}
                  className='absolute right-8 top-6'>
                  {showPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                </button >
              </div>
              {error && <p className="text-xs text-error">{error}</p>}
              <div className='flex items-center mt-4'>
                <button type='submit' className=" bg-[#B11226] w-1/3 text-white text-lg p-2">Register</button>
                <p className='text-center text-lg'>Or</p>
                {
                  !user &&
                  <button className='p-3 text-white bg-[#B11226] w-1/2  text-sm ' onClick={handleGoogleSignIn}>Register With Google</button>
                }
             </div>
              <p className='font-semibold text-center pt-2 text-lg'>Allready have an account? <NavLink to='/login' className="text-[#B11226]">Login</NavLink></p>
            </fieldset>
          </form>
        </div>
      </div>
    </DocumentMeta>
  );
};

export default Register;