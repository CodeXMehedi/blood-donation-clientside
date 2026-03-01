import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Who can donate blood?',
    answer:
      'Anyone aged between 18-60 years, healthy and meeting basic eligibility criteria can donate blood.',
  },
  {
    question: 'How often can I donate blood?',
    answer:
      'You can donate whole blood every 3 months. It is safe and your body replaces the lost blood quickly.',
  },
  {
    question: 'Is blood donation safe?',
    answer:
      'Yes, blood donation is completely safe. Sterile equipment is used for every donor.',
  },
  {
    question: 'How can I request blood?',
    answer:
      'Simply create a donation request from your dashboard and nearby donors will be notified.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pb-20 md:pb-25 w-11/12 mx-auto">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-5xl  font-bold text-center text-[#8a0303] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 dark:text-white text-lg mb-16">
          Everything you need to know about blood donation.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 dark:border-gray-600 pb-4 text-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 dark:text-gray-200"
              >
                {faq.question}
                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
