import { Link } from 'react-router';
import { FaHandHoldingHeart } from 'react-icons/fa';

const FundingSection = () => {
  return (
    <section className="mb-20 md:mb-25 w-11/12 mx-auto ">
      <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaHandHoldingHeart className="text-[#b11226] text-3xl" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#8a0303]">
              Support Our Mission
            </h2>
          </div>

          <p className="text-gray-600 dark:text-white text-lg mb-6">
            Your contribution helps us organize blood donation campaigns,
            maintain our platform, and reach patients in urgent need. Together,
            we can save more lives.
          </p>

          <ul className="space-y-3 text-gray-600 dark:text-white mb-8">
            <li>✔ Organizing Blood Donation Camps</li>
            <li>✔ Emergency Response Support</li>
            <li>✔ Donor Awareness Programs</li>
            <li>✔ Maintaining Secure Donation Platform</li>
          </ul>

          <Link
            to="/funding"
            className="inline-block bg-[#b11226] text-white px-8 py-3 rounded text-lg transition duration-300 shadow-lg"
          >
            Contribute Now →
          </Link>
        </div>

        {/* Right Highlight Card */}
        <div className="bg-linear-to-br from-[#8a0303] to-[#b11226] text-white p-10 rounded shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Every Donation Matters ❤️</h3>

          <p className="mb-6 text-white text-lg">
            Even a small contribution can help provide essential medical
            resources and ensure timely blood availability for patients.
          </p>

          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <h4 className="text-2xl font-bold">500+</h4>
              <p className="text-white  text-sm">Camps Organized</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold">10K+</h4>
              <p className="text-white text-sm">Lives Supported</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingSection;
