import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Funding = () => {
  const { user } = useContext(AuthContext);
  const [fundAmount, setFundAmount] = useState('');
  const [funding, setFunding] = useState([]);
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

    const res = await axiosSecure.post(
      '/create-checkout-session',
      fundingInfo,
    );
    
    window.location.href = res.data.url;
  };


  useEffect(() => {
    axiosSecure.get('/funding').then(res => {
      setFunding(res.data)
    });
  }, [axiosSecure])
  // console.log(funding)
  return (
    <div className=" my-10">
      <h2 className="text-4xl text-primary text-center my-6 ">
        <span className='font-semibold'>Funding Overview</span> 
      </h2>
      <div className="w-9/12  mx-auto  flex justify-end">
        <div className=" w-6/12 ">
          <div className=" flex gap-2 items-center mb-4">
            <legend className="fieldset-legend text-lg">Amount: </legend>
            <input
              type="text"
              className="input"
              placeholder="Enter amount"
              value={fundAmount}
              onChange={e => setFundAmount(e.target.value)}
            />
          </div>
          <div className=" flex justify-center">
            <button onClick={handleGiveFund} className="btn btn-primary">
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
              <tr>
                <th></th>
                <th>Name</th>
                <th>Fund Amount</th>
                <th>Funding Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {funding.map((f, index) => {
                return (
                  <tr key={f._id} className="hover:bg-base-300">
                    <th>{index + 1}</th>
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
    </div>
  );
};

export default Funding;
