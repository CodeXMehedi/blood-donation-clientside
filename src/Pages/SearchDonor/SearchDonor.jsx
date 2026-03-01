import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SearchDonor = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [searchParams, setSearchParams] = useState(null);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axios.get('/Upazilas.json').then(res => {
      setUpazilas(res.data);
    });

    axios.get('/District.json').then(res => {
      setDistricts(res.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: donors = [],
    // refetch,
    // isFetching,
  } = useQuery({
    queryKey: ['donorSearch', searchParams],
   enabled: !!searchParams,
    queryFn: async () => {
      const res = await axiosSecure.get('/user', {
        params: searchParams,
      });
      return res.data;
    },
  });

  const handleSearch = data => {
    console.log(data);
    const params = {
      bloodGroup: data.bloodGroup,
      district: data.selectDistrict,
      upazila: data.upazila,
    };
    setSearchParams(params);

    
  };

  console.log()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-10/12  mx-auto my-20 ">
      <form onSubmit={handleSubmit(handleSearch)} className="flex-1 mr-20 ml-4">
        <fieldset className="fieldset text-lg  ">
          <label className="label dark:text-white">Select Blood Group</label>
          <select
            className="select w-full"
            name="bloodGroup"
            defaultValue=""
            id="select"
            {...register('bloodGroup', { required: true })}
          >
            <option value="" disabled>
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
          {errors.bloodGroup?.type === 'required' && (
            <p className="text-red-600">Blood Group</p>
          )}

          <label className="label dark:text-white">Select your Upazila</label>

          <select
            value={upazila}
            {...register('upazila', { required: true })}
            onChange={e => setUpazila(e.target.value)}
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
          {errors.upazila?.type === 'required' && (
            <p className="text-red-600">Select Your Upazila</p>
          )}

          <label className="label dark:text-white">Select your district</label>

          <select
            value={district}
            {...register('selectDistrict', { required: true })}
            onChange={e => setDistrict(e.target.value)}
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
          {errors.selectDistrict?.type === 'required' && (
            <p className="text-red-600">Select Your District</p>
          )}

          <button className="btn bg-[#b11226] text-lg mt-4">Search</button>
        </fieldset>
      </form>
      <div className="flex-1 flex justify-center items-center">
        {searchParams && donors.length === 0 && (
          <p className="text-4xl">No Donors Found.</p>
        )}

        {donors.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {donors.map(donor => (
              <div
                key={donor._id}
                className="p-4 border-2 border-red-400 rounded mb-3 text-lg"
              >
                <h3 className="font-bold">{donor.name}</h3>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>
                  {donor.upazila}, {donor.district}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonor;
