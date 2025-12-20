import React, { useContext, useEffect, useState} from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const CreateDonationRequest = () => {
  const { user, loading } = useContext(AuthContext);
 const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const axiosInstance = useAxios();


 useEffect(() => {
    if (!user?.email || loading) return;

    axiosInstance.get('/users', {
      params: { email: user?.email }
    })
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => console.log(err));

  }, [user?.email, loading]);


  useEffect(() => {
    axios.get('/Upazilas.json').then(res => {
      setUpazilas(res.data);
    })

    axios.get('/District.json').then(res => {
      setDistricts(res.data);
    })
  }, [])
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Please login first</p>;
  }
 
  const handleRequest = (e) => {
    e.preventDefault();

    const form = e.target;

    const requesterName = user?.displayName;
    const requesterEmail = user?.email;

    const recipientName = form.recipientName.value;
    const hospitalName = form.hospitalName.value;
    const address = form.address.value;
    const bloodGroup = form.bloodGroup.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const message = form.message.value;
    const donationRequestData = {
      requesterName,
      requesterEmail,
      recipientName,
      district,
      upazila,
      hospitalName,
      address,
      bloodGroup,
      donationDate,
      donationTime,
      message,
      donationStatus: "pending",
    };
    if (userData?.status == 'active') {
      
    
      axiosInstance.post('/create-donation-request', donationRequestData)
        .then(res => {
          console.log(res);
          toast.success('Request add successful')
        }).catch(err => console.log(err))
    };
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-xl my-4">
      <h2 className="bg-[#B11226] p-4 text-center font-semibold text-2xl mb-4 text-white ">
        Create Donation Request
      </h2>
      <form onSubmit={handleRequest} className="space-y-4">
        <label className="label">Requester Name</label>
        <input
          type="text"
          value={user?.displayName}
          readOnly
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Requester Email</label>
        <input
          type="email"
          value={user?.email}
          readOnly
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Recipient Name</label>
        <input
          type="text"
          name="recipientName"
          // onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <div className="flex items-center gap-4 my-2">
          <label className="label mt-2">Recipient District</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} className='select'>
            <option disabled value="">Select your district</option>
            {
              districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
            }
          </select>
        </div>

        <div className="flex items-center gap-4 my-2">
          <label className="label mt-2">Recipient Upazila</label>
          <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className='select'>
            <option disabled value=''>Select your Upazila</option>
            {
              upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
            }
          </select>
        </div>

        <label className="label mt-2">Hospital Name</label>
        <input
          type="text"
          name="hospitalName"
          placeholder="Dhaka Medical College Hospital"
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Full Address</label>
        <input
          type="text"
          name="address"
          placeholder="Zahir Raihan Rd, Dhaka"
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Blood Group</label>
        <select className='select select-bordered w-full' name="bloodGroup" defaultValue='Select Blood Group' id="select">
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

        <label className="label mt-2">Donation Date</label>
        <input
          type="date"
          name="donationDate"
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Donation Time</label>
        <input
          type="time"
          name="donationTime"
          className="input input-bordered w-full"
        />

        <label className="label mt-2">Request Message</label>
        <textarea
          name="message"
          className="textarea textarea-bordered w-full"
          placeholder="Please explain in detail why the blood is needed."
        ></textarea>

        <button type="submit" className=" w-full mt-4 bg-[#B11226]  text-white text-lg p-3">
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
