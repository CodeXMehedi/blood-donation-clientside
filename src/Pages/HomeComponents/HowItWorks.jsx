import { FaUserPlus, FaSearch, FaHandHoldingHeart } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: 'Register',
      desc: 'Sign up and add your blood group & location.',
    },
    {
      icon: <FaSearch />,
      title: 'Search / Request',
      desc: 'Find donors or create emergency blood requests.',
    },
    {
      icon: <FaHandHoldingHeart />,
      title: 'Donate',
      desc: 'Connect and save a life safely.',
    },
  ];

  return (
    <section className="md:pb-25 pb-20 w-10/12 mx-auto ">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-5xl  font-bold text-[#8a0303] mb-16">
          How It Works
        </h2>
      </div>
      <div className="relative grid md:grid-cols-3 gap-12 items-start text-center">
        {/* Horizontal Line */}
        <div className="hidden md:block w-full absolute top-10 left-0 h-1 bg-red-200"></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative w-11/12 mx-auto"
          >
            {/* Circle */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#b11226] text-white text-3xl z-10">
              {step.icon}
            </div>

            <span className="mt-4 text-[#b11226] text-lg font-bold">
              Step {index + 1}
            </span>

            <h3 className="text-2xl font-semibold mt-2">{step.title}</h3>

            <p className="text-gray-600 dark:text-white  mt-2 max-w-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
