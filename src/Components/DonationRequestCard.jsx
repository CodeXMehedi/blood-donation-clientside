import React from 'react';
import { Link } from 'react-router';
const DonationRequestCard = ({allRequest}) => {
  return (
    <div className="lg:hidden space-y-5">
      {allRequest.map(r => (
        <div
          key={r._id}
          className="bg-white shadow-2xl rounded p-4  transition duration-500 hover:-translate-y-3 text-gray-600"
        >
          <h3 className="text-xl font-semibold">{r.requesterName}</h3>

          <p className="text-lg text-gray-600">
            Address : {r.upazila}, {r.district}
          </p>

          <p className="text-lg">
            📅 {r.donationDate} | ⏰ {r.donationTime}
          </p>

          <p className="text-secondary font-semibold mt-2">{r.bloodGroup}</p>

          <p className="mt-2 text-lg">Status: {r.donationStatus}</p>

          <Link
            to={`/all-donation-request/details/${r._id}`}
            className="block mt-4 bg-[#b11226] text-white text-center py-2 rounded "
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DonationRequestCard;