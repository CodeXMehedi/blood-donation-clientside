import { NavLink,  useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { use, useEffect, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { Eye, EyeClosed } from 'lucide-react';
import toast from 'react-hot-toast';
import DocumentMeta from 'react-document-meta';
import axios from 'axios';
import useAxios from '../hooks/useAxios';



// const googleProvider = new GoogleAuthProvider();
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

  const { createUser, setUser, updateUser } = use(AuthContext);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get('/Upazilas.json').then(res => {
      setUpazilas(res.data);
    })

    axios.get('/District.json').then(res => {
      setDistricts(res.data);
    })
  }, [])
 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');
    setConfirmPasswordError('');

    const form = e.target;
    const name = form.name.value;
    if (name.length < 5) {
      setError("Name should be more then 5 character");
      return;
    }
    else {
      setError('');
    }

    const email = form.email.value;
    // const password = form.password.value;
   
    const photo = form.photo;
    const file = photo.files[0];
    const bloodGroup = form.bloodGroup.value;
    // console.log({ name, photo, email, password });

    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordPattern.test(trimmedPassword)) {
      setPasswordError('Password must be at least 6 characters long, and include at least one uppercase, one lowercase, and one special character');
      return
    }

    if (trimmedPassword !== trimmedConfirm) {
      setConfirmPasswordError("Password and Confirm Password do not match");
      return;
    }
    else {
      setConfirmPasswordError('');
    }

    const imageData = new FormData();
    imageData.append("image", file);
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, imageData);
    // console.log(response);
    const imageUrl = response.data.data.display_url;

    const formData = {
      name,
      email,
      imageUrl,
      bloodGroup,
      password,
      district,
      upazila

    }

    if (response.data.success == true) {

      createUser(email, password).then((result) => {
        const user = result.user;

        updateUser({ displayName: name, photoURL: imageUrl })
          .then(() => {

            setUser({ ...user, displayName: name, photoURL: imageUrl });

            //store data in the database
            axiosInstance.post('/users', formData).then(res => {
              console.log(res.data);
            }).catch(err => {
              console.log(err);
            })
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
  }



  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  return (
    <DocumentMeta {...meta}>
      <div className='flex justify-center items-center  lg:min-h-screen  my-2'>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl  border-2 border-[#B11226]">
          <h2 className='bg-[#B11226] p-4 text-center font-semibold text-2xl text-white '>Register Your Account</h2>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input name='name' type="text" className="input" placeholder="Name" required />
              {error && <p className="text-xs text-error">{error}</p>}

              <label className="label">Photo URL</label>
              <input name='photo' type="file" className="input" placeholder="Photo URL" required />

              <label className="label">Email</label>
              <input name='email' type="email" className="input" placeholder="Email" required />

              <label className="label">Select Blood Group</label>
              <select className='select' name="bloodGroup" defaultValue='Select Blood Group' id="select">
                <option disabled={true}>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>


              <label className="label">Select your Upazila</label>

              <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className='select'>
                <option disabled  value=''>Select your Upazila</option>
                {
                  upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
                }
              </select>

              <label className="label">Select your district</label>

              <select value={district} onChange={(e)=>setDistrict(e.target.value)} className='select'>
                <option disabled  value="">Select your district</option>
                {
                  districts.map(d => <option value={d?.name} key={d.id}>{ d?.name}</option>)
                }
              </select>

             


              <div className='relative'>
                <label className="label">Password</label>
                <input
                  
                  type={showPassword ? 'text' : "password"}
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required />
                <button
                  onClick={handleTogglePasswordShow}
                  className='absolute right-8 top-6'>
                  {showPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                </button >
              </div>
              {passwordError && <p className="text-xs text-error">{passwordError}</p>}


              <div className='relative'>
                <label className="label">Confirm Password</label>
                <input

                  type={showPassword ? 'text' : "password"}
                  className="input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Password"
                  required />
                <button
                  onClick={handleTogglePasswordShow}
                  className='absolute right-8 top-6'>
                  {showPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                </button >
              </div>
              {confirmPasswordError && <p className="text-xs text-error">{confirmPasswordError}</p>}
              <div className='flex justify-center  mt-4'>
                <button type='submit' className=" bg-[#B11226] w-1/3 text-white text-lg p-2">Register</button>
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