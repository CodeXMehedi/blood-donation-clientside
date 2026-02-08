import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';

const Funding = () => {
  const { user } = useContext(AuthContext);
   const [fundAmount, setFundAmount] = useState('');
console.log(user.uid)
  const handleGiveFund = async() => {

    if (!fundAmount || fundAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const fundingInfo = {
      money: fundAmount, 
      senderEmail: user.email,
      userId: user.uid,
      userName: user.name,
    }
    const res = await axios.post(
      'http://localhost:5000/create-checkout-session',
      fundingInfo,
    );
    // console.log(res.data);
    
  window.location.href = res.data.url;
  }
  return (
    <div>
      <legend className="fieldset-legend">Amount</legend>
      <input
        type="text"
        className="input"
        placeholder="Enter amount"
        value={fundAmount}
        onChange={e => setFundAmount(e.target.value)}
      />
      <button onClick={handleGiveFund} className="btn btn-primary">
        Give Fund
      </button>
    </div>
  );
};

export default Funding;