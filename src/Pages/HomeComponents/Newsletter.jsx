import toast from "react-hot-toast";

const Newsletter = () => {
  const handleSubs=(e) => {
     e.preventDefault();
    toast.success('Subscribed !');    
        e.target.reset();
  }
  return (
    <section className="relative py-10 mb-20 md:mb-25 bg-linear-to-r from-[#8a0303] via-[#b11226] to-[#8a0303] overflow-hidden">
      {/* Background Blur Effect */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
        {/* Title */}
        <h2 className="text-2xl  md:text-5xl font-bold mb-4 leading-tight">
          Stay Updated. <br className="hidden md:block" />
          <span className="text-red-200">Be Someone’s Lifeline.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg   max-w-2xl mx-auto mb-10">
          Get instant alerts about urgent blood donation requests and important
          updates from our community.
        </p>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded shadow-2xl border border-white/20 max-w-3xl mx-auto">
          <form onSubmit={handleSubs} className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full  px-5 py-4 rounded  text-white border-white focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

            <button
              type="submit"
              className="w-full md:w-auto cursor-pointer bg-white text-[#b11226] font-semibold px-8 py-4 rounded hover:scale-105 hover:bg-gray-300 transition duration-300"
            >
              Subscribe Now
            </button>
          </form>
        </div>

        {/* Small Note */}
        <p className="text-sm mt-6">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
