import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router";


import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../Contexts/AuthContext";

const Details = () => {
  const { id } = useParams();
  
  const { user } = useContext(AuthContext);

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/my-donation-request/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load request");
        setLoading(false);
      });
  }, [id]);

  console.log(request)
  const handleDonate = (e) => {
    e.preventDefault();

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
      

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
          Blood Donation Request Details
        </h2>

        <div className="space-y-2">
          <p><b>Recipient Name:</b> {request.recipientName}</p>
          <p><b>Blood Group:</b> {request.bloodGroup}</p>
          <p>
            <b>Location:</b> {request.district},{" "}
            {request.upazila}
          </p>
          <p><b>Hospital:</b> {request.hospitalName}</p>
          <p><b>Address:</b> {request.address}</p>
          <p><b>Date:</b> {request.donationDate}</p>
          <p><b>Time:</b> {request.donationTime}</p>
          <p><b>Message:</b> {request.
            message}</p>
          <p>
            <b>Status:</b>{" "}
            <span className="text-red-600 font-semibold">
              {request.
                donationStatus}
            </span>
          </p>
        </div>

        {request.donationStatus === "pending" && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() =>
                document.getElementById("donate_modal").showModal()
              }
              className="btn btn-error"
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
            <form onClick={handleDonate}>
              <div>
                <label className="font-semibold">Donor Name</label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="font-semibold">Donor Email</label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div className="flex justify-center">
                <button
                 type="submit"
                  className="btn btn-error"
                >
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
