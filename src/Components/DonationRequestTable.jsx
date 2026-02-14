import React from 'react';
import { Link } from 'react-router';
const DonationRequestTable = ({ allRequest }) => {
  return (
    <div className="hidden md:block   mb-6">
      <div className="overflow-x-auto  ">
        <table className="table ">
          <thead className="text-lg text-gray-700">
            <tr>
              <th>Recipient Name</th>
              <th>Recipient location</th>
              <th>Donation date</th>
              <th>Donation time</th>
              <th>Blood group </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {allRequest.map(r => (
              <tr key={r._id}>
                <td>{r.requesterName}</td>
                <td>
                  {r.upazila},{r.district}
                </td>
                <td>{r.donationDate}</td>
                <td>{r.donationTime}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.donationStatus}</td>
                <td>
                  <Link
                    to={`/all-donation-request/details/${r?._id}`}
                    className="bg-[#B11226] w-40  p-2 text-white"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationRequestTable;