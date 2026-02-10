
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Toaster, toast } from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Details = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    axiosSecure
      .get(`/my-donation-request/${id}`)
      .then(res => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load request');
        setLoading(false);
      });
  }, [id,axiosSecure]);

  // console.log(request);
  const handleDonate = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const donorData = {
      name,
      email,
    };
    axiosSecure
      .patch(`/all-donation-request/${id}`, donorData)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success('Donation confirmed ');

          setRequest(prev => ({
            ...prev,
            donationStatus: 'inprogress',
          }));

          document.getElementById('donate_modal').close();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-error text-4xl"></span>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-9/12 mx-auto bg-white shadow-lg rounded-lg p-8 my-20">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Blood Donation Request Details
        </h2>

        <div className="space-y-2">
          <p>
            <b className='text-secondary'>Recipient Name:</b> {request.recipientName}
          </p>
          <p>
            <b>Blood Group:</b> {request.bloodGroup}
          </p>
          <p>
            <b>Location:</b> {request.district}, {request.upazila}
          </p>
          <p>
            <b>Hospital:</b> {request.hospitalName}
          </p>
          <p>
            <b>Address:</b> {request.address}
          </p>
          <p>
            <b>Date:</b> {request.donationDate}
          </p>
          <p>
            <b>Time:</b> {request.donationTime}
          </p>
          <p>
            <b>Message:</b> {request.message}
          </p>
          <p>
            <b>Status:</b>{' '}
            <span className="text-secondary font-semibold">
              {request.donationStatus}
            </span>
          </p>
        </div>

        {request.donationStatus === 'pending' && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() =>
                document.getElementById('donate_modal').showModal()
              }
              className="btn btn-secondary  py-6 px-20 "
            >
              Donate Blood
            </button>
          </div>
        )}
      </div>

      {/* 🔹 Modal */}
      <dialog id="donate_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="text-xl font-bold text-center mb-4">
            Confirm Donation
          </h3>

          <div className="space-y-4">
            <form onSubmit={handleDonate}>
              <div className="my-6">
                <label className="font-semibold ">Donor Name</label>
                <input
                  type="text"
                  value={user?.displayName}
                  name="name"
                  readOnly
                  className="mt-2  input input-bordered w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="font-semibold">Donor Email</label>
                <input
                  type="email"
                  value={user?.email}
                  name="email"
                  readOnly
                  className="mt-2 input input-bordered w-full bg-gray-100"
                />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="btn btn-secondary px-6 m-4">
                  Confirm Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <Toaster />
    </>
  );
};

export default Details;
