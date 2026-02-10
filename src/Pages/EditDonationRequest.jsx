
import { useNavigate, useParams } from 'react-router';
import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';



const EditDonationRequest = () => {
  const { id } = useParams();
  
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // const [name, setName] = useState('');
  // const [hospitalName, setHospitalName] = useState('');
  // const [address, setAddress] = useState('');
  //  const [district, setDistrict] = useState('');
  // const [upazila, setUpazila] = useState('');
  // const [bloodGroup, setBloodGroup] = useState('');
  // const [date, setDate] = useState('');
  // const [time, setTime] = useState('');
  
  const axiosSecure = useAxiosSecure();


  useEffect(() => {
    axios.get('/Upazilas.json').then(res => {
      setUpazilas(res.data);
    });

    axios.get('/District.json').then(res => {
      setDistricts(res.data);
    });
     axiosSecure.get(`/my-donation-request/${id}`).then(res => {
       setUser(res.data);
       console.log(res.data);
     });
  }, [id,axiosSecure]);
  
 
// console.log(user)
  const handleRequest = e => {
    e.preventDefault();

    const donationRequestData = {
      requesterName: user?.requesterName || user?.displayName,
      requesterEmail: user?.requesterEmail || user?.email,
      recipientName: user?.recipientName,
      district: user?.district,
      upazila: user?.upazila,
      hospitalName: user?.hospitalName,
      address: user?.address,
      bloodGroup: user?.bloodGroup,
      donationDate: user?.donationDate,
      donationTime: user?.donationTime,
      message: user?.message,
      // donationStatus: 'pending',
    };

    // console.log(donationRequestData);

    
      axiosSecure
        .patch(`/my-donation-request/update?id=${id}`, donationRequestData)
        .then(res => {
          console.log(res.data);

          toast.success('Request add successful');
          navigate('/dashboard/my-donation-requests');
        })
        .catch(err => console.log(err));
    
  };


  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-xl my-4">
      <h2 className="bg-[#B11226] p-4 text-center font-semibold text-2xl mb-4 text-white ">
        Create Donation Request
      </h2>

      <form onSubmit={handleRequest} className="space-y-4">
        <label className="label">Requester Name</label>
        <input
          type="text"
          value={user?.requesterName}
          readOnly
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Requester Email</label>
        <input
          type="email"
          value={user?.requesterEmail}
          readOnly
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Recipient Name</label>
        <input
          type="text"
          name="recipientName"
          value={user?.recipientName || ''}
          onChange={e =>
            setUser(prevUser => ({
              ...prevUser,
              recipientName: e.target.value,
            }))
          }
          autoComplete="name"
          className="input input-bordered w-full"
        />

        <div className="flex items-center gap-4 my-2">
          <label className="label mt-2">Recipient District</label>
          <select
            value={user?.district || ''}
            onChange={e =>
              setUser(prevUser => ({ ...prevUser, district: e.target.value }))
            }
            className="select w-full"
          >
            <option disabled value="">
              Select your district
            </option>
            {districts.map(d => (
              <option value={d?.name} key={d.id}>
                {d?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 my-2">
          <select
            value={user?.upazila || ''}
            onChange={e =>
              setUser(prevUser => ({ ...prevUser, upazila: e.target.value }))
            }
            className="select w-full"
          >
            <option disabled value="">
              Select your Upazila
            </option>
            {upazilas.map(u => (
              <option value={u?.name} key={u.id}>
                {u?.name}
              </option>
            ))}
          </select>
        </div>

        <label className="label mt-2">Hospital Name</label>
        <input
          type="text"
          name="hospitalName"
          value={user?.hospitalName || ''}
          onChange={e =>
            setUser(prevUser => ({ ...prevUser, hospitalName: e.target.value }))
          }
          placeholder="Dhaka Medical College Hospital"
          className="input input-bordered w-full"
          autoComplete="organization"
        />

        <label className="label mt-2">Full Address</label>
        <input
          type="text"
          name="address"
          value={user?.address || ''}
          onChange={e =>
            setUser(prev => ({ ...prev, address: e.target.value }))
          }
          placeholder="Zahir Raihan Rd, Dhaka"
          className="input input-bordered w-full"
          autoComplete="street-address"
        />

        <label className="label mt-2">Blood Group</label>
        <select
          name="bloodGroup"
          value={user?.bloodGroup || ''}
          onChange={e =>
            setUser(prev => ({ ...prev, bloodGroup: e.target.value }))
          }
          className="select select-bordered w-full"
        >
          <option disabled value="">
            Select Blood Group
          </option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <label className="label mt-2">Donation Date</label>
        <input
          type="date"
          name="donationDate"
          value={user?.donationDate || ''}
          onChange={e =>
            setUser(prev => ({ ...prev, donationDate: e.target.value }))
          }
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Donation Time</label>
        <input
          type="time"
          name="donationTime"
          value={user?.donationTime || ''}
          onChange={e =>
            setUser(prev => ({ ...prev, donationTime: e.target.value }))
          }
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Request Message</label>
        <textarea
          name="message"
          value={user?.message || ''}
          onChange={e =>
            setUser(prev => ({ ...prev, message: e.target.value }))
          }
          className="textarea textarea-bordered w-full"
          placeholder="Please explain in detail why the blood is needed."
        ></textarea>

        <button
          type="submit"
          className="w-full mt-4 bg-[#B11226] text-white text-lg p-3"
        >
          Edit Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;