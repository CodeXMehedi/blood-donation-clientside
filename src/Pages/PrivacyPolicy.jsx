const PrivacyPolicy = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-2xl md:text-5xl text-[#8a0303] font-bold  mb-8 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          blood donation platform.
        </p>

        {/* Information We Collect */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[#b11226] mb-4">
            1. Information We Collect
          </h2>
          <ul className="space-y-3 text-gray-600 list-disc pl-6">
            <li>Name, email address, phone number</li>
            <li>Blood group and donation history</li>
            <li>Location information</li>
            <li>Communication preferences</li>
          </ul>
        </div>

        {/* How We Use Info */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[#b11226] mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="space-y-3 text-gray-600 list-disc pl-6">
            <li>To connect donors with patients in need</li>

            <li>To improve our services and user experience</li>
            <li>To maintain security and prevent misuse</li>
          </ul>
        </div>

        {/* Data Protection */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[#b11226] mb-4">
            3. Data Protection
          </h2>
          <p className="text-gray-600">
            We implement appropriate security measures to protect your personal
            data from unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the internet is
            100% secure.
          </p>
        </div>

        {/* Sharing Policy */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[#b11226] mb-4">
            4. Information Sharing
          </h2>
          <p className="text-gray-600">
            We do not sell or rent your personal information. Your information
            is only shared when necessary to connect donors with recipients or
            comply with legal obligations.
          </p>
        </div>

        {/* User Rights */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[#b11226] mb-4">
            5. Your Rights
          </h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal
            information at any time. If you wish to do so, please contact us.
          </p>
        </div>

        {/* Updates */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[#b11226] mb-4">
            6. Updates to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with a revised effective date.
          </p>
        </div>

        <p className="text-gray-500 text-sm mt-12 text-center">
          Last Updated: March 2026
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
