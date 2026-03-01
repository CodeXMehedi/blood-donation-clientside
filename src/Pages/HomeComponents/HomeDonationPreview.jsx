import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const HomeDonationPreview = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get('/all-donation-request?limit=6&skip=0').then(res => {
      setRequests(res.data.result);
    });
  }, [axiosSecure]);

  return (
    <div className="mb-20 md:mb-25 w-10/12 mx-auto">
      {/* Section Header */}
      <div className="text-center mb-20">
        <h3 className="text-2xl md:text-5xl font-bold text-[#8a0303] mb-4">
          Blood Requests
        </h3>
        <p className="text-gray-600 dark:text-white text-lg max-w-2xl mx-auto">
          Help patients in urgent need. Your blood donation can save lives.
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        key={requests.length}
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 60,
          depth: 200,
          modifier: 1,
          scale: 0.85,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={400}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
      >
        {requests.map(req => (
          <SwiperSlide key={req._id}>
            <div className="bg-white shadow-xl rounded p-8 max-w-md mx-auto border border-gray-200">
              {/* Blood Group */}
              <h4 className="text-2xl font-bold text-[#b11226] mb-3">
                {req.bloodGroup}
              </h4>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {req.requesterName}
              </h3>

              {/* Location */}
              <p className="text-gray-600 dark:text-white mb-1">
                {req.upazila}, {req.district}
              </p>

              {/* Date & Time */}
              <p className="text-gray-600 mb-4">
                🗓 {req.donationDate} | ⏰ {req.donationTime}
              </p>

              {/* Status */}
              <div className="mb-5">
                <span className="px-3  py-1 text-sm rounded-full bg-red-200 text-[#b11226]">
                  {req.donationStatus}
                </span>
              </div>

              {/* Button */}
              <Link
                to={`/all-donation-request/details/${req._id}`}
                className="inline-block bg-[#b11226] text-white px-6 py-2 rounded  transition"
              >
                View Details
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View More */}
      <div className="text-center mt-16">
        <Link
          to="/all-donation-request"
          className="bg-[#b11226] text-white px-8 py-3 rounded text-lg  transition"
        >
          View More →
        </Link>
      </div>
    </div>
  );
};

export default HomeDonationPreview;
