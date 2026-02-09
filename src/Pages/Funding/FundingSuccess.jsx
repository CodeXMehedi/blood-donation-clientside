import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';


const FundingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  console.log(sessionId)

  useEffect(() => {
    if (sessionId) {
      axios.post(`http://localhost:5000/funding?session_id=${sessionId}`)
        .then(res => {
          console.log(res.data)
        })
      }
      
    
  },[sessionId])
return (
     
    <div className="flex flex-col gap-10 justify-center items-center h-[80vh]">
      <p className="text-xl bg-[#E8F5F0]">
        <span className="text-primary text-4xl">Funding Successful!</span> 🩸 ❤️
        <br />
        Thank you for contributing to Red Drop and helping save lives. <br />
      </p>
      <Link to={'/funding'} className="btn px-10 btn-primary">
        Back
      </Link>
    </div>
  );
};

export default FundingSuccess;