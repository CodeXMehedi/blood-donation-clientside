import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

import useAxiosSecure from '../../hooks/useAxiosSecure';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const axiosSecure = useAxiosSecure();
  // 🔹 Fetch User Data
  console.log('isEditing:', isEditing);
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/users/by-email?email=${user.email}`)
        .then(res => {
          setUserData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user,axiosSecure]);
console.log(userData)
  // 🔹 Handle Input Change
  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle Save
  const handleSave = async e => {
    e.preventDefault();
const updateUserData = {
  name: userData.name,
  district: userData.district,
  upazila: userData.upazila,
  bloodGroup: userData.bloodGroup,
  avatar: userData.imageUrl,
};
    try {
      setSaving(true);

      await axiosSecure.patch(
        `/users/update?id=${userData?._id}`,
        updateUserData,
      );

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#8a0303]">My Profile</h2>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-sky-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}

        {isEditing && (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={userData?.imageUrl || 'https://i.ibb.co/4pDNDk1/avatar.png'}
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover border-2 border-secondary"
        />
      </div>

      <form id="profileForm" onSubmit={handleSave} className="space-y-4 text-gray-600">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={userData?.name || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Email (Not Editable) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={userData?.email || ''}
            disabled
            className="w-full border border-gray-300 p-2 rounded bg-gray-100"
          />
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-medium">District</label>
          <input
            type="text"
            name="district"
            value={userData?.district || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="block mb-1 font-medium">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={userData?.upazila || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-1 font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={userData?.bloodGroup || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 p-2 rounded disabled:bg-gray-100"
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Profile;
