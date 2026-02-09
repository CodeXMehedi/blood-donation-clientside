import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Funding = () => {
  const { user } = useContext(AuthContext);
  const [fundAmount, setFundAmount] = useState('');
  const [funding, setFunding] = useState([]);
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

    const res = await axios.post(
      'http://localhost:5000/create-checkout-session',
      fundingInfo,
    );
    // console.log(res.data);

    window.location.href = res.data.url;
  };


  useEffect(() => {
    axios.get('http://localhost:5000/funding').then(res => {
      // console.log(res.data)
      setFunding(res.data)
    });
  }, [])
  console.log(funding)
  return (
    <div className="">
      <div className="w-9/12 mx-auto grid grid-cols-1 gap-4">
        <div className="flex gap-2 items-center">
          <legend className="fieldset-legend text-lg">Amount : </legend>
          <input
            type="text"
            className="input"
            placeholder="Enter amount"
            value={fundAmount}
            onChange={e => setFundAmount(e.target.value)}
          />
        </div>
        <div >
          <button onClick={handleGiveFund} className="btn btn-primary">
            Give Fund
          </button>
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
