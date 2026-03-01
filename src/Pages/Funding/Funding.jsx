import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Funding = () => {
  const { user } = useContext(AuthContext);

  const [fundAmount, setFundAmount] = useState('');
  const [funding, setFunding] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;

  const axiosSecure = useAxiosSecure();

  const handleGiveFund = async () => {
    if (!fundAmount || fundAmount <= 0) {
      toast('Please enter a valid amount');
      return;
    }

    const fundingInfo = {
      money: fundAmount,
      senderEmail: user.email,
      userId: user.uid,
      userName: user.displayName,
    };

    const res = await axiosSecure.post('/create-checkout-session', fundingInfo);

    window.location.href = res.data.url;
  };

  useEffect(() => {
    axiosSecure
      .get(
        `/funding?limit=${limit}&skip=${currentPage * limit}`,
      )
      .then(res => {
        setFunding(res.data.result);
        const page = Math.ceil(res.data.total / limit);
        setTotalPage(page);
      });
  }, [axiosSecure, currentPage]);
 


  return (
    <div className=" my-10">
      <h2 className="text-4xl text-[#8a0303] text-center my-6 ">
        <span className="font-bold md:text-4xl text-2xl">Funding Overview</span>
      </h2>
      <div className="w-9/12  mx-auto  flex justify-end">
        <div className=" w-6/12 ">
          <div className=" flex gap-2 items-center mb-4">
            <legend className="fieldset-legend text-lg">Amount: </legend>
            <input
              type="text"
              className="input bg-white  text-gray-600"
              placeholder="Enter amount"
              value={fundAmount}
              onChange={e => setFundAmount(e.target.value)}
            />
          </div>
          <div className=" flex justify-center">
            <button onClick={handleGiveFund} className="btn bg-[#b11226]">
              Give Fund
            </button>
          </div>
        </div>
      </div>
      <div className="w-9/12 mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-lg">
               
                <th>Name</th>
                <th>Fund Amount</th>
                <th>Funding Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {funding.map((f) => {
                return (
                  <tr key={f._id} className="hover:bg-base-300">
                    
                    <td>{f.name}</td>
                    <td>{f.amount}</td>
                    <td>{f.dateTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center flex-wrap gap-3 py-10">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn"
          >
            Prev
          </button>
        )}

        {[...Array(totalPage).keys()].map(i => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`btn ${i === currentPage && 'bg-[#b11226]'}`}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPage - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Funding;
