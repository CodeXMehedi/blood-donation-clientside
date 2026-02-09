import React from 'react';
import { Link } from 'react-router';

const FundingCancelled = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[80vh]">
      <p className="text-4xl bg-[#E8F5F0]">
        <span className="text-primary text-4xl"> Funding cancelled !</span>{' '}
        <br />
        Your donation to Red Blood was not completed.
        <br />
        No worries — you can donate again when you’re ready.
      </p>
      <Link to={'/funding'} className="btn px-10 btn-primary">
        Back
      </Link>
    </div>
  );
};

export default FundingCancelled;
