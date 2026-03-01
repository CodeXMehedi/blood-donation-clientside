import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import redCrescent from '../../assets/red-crecentages.png';
import who from '../../assets/downlxdvoad.jfif';
import unicef from '../../assets/imdfbdfbfages (1).png';
import apollo from '../../assets/apollo.jfif';
import square from '../../assets/squareoad.png';

const Partners = () => {
 const partners = [
   { name: 'Red Crescent', logo: redCrescent },
   { name: 'WHO', logo: who },
   { name: 'UNICEF', logo: unicef },
   { name: 'Apollo', logo: apollo },
   { name: 'Square', logo: square },
 ];

  return (
    <section className="mb-20 mb:mb-25 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-5xl font-bold text-[#8a0303] mb-4">
          Our Trusted Partners
        </h2>
        <p className="text-gray-600 text-lg dark:text-white">
          We collaborate with leading hospitals and global health organizations.
        </p>
      </div>

      <div className="w-full">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={40}
          loop={true}
          speed={5000} // smoother continuous
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          allowTouchMove={false} // smooth marquee feel
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {partners.concat(partners).map((partner, index) => (
            <SwiperSlide key={index}>
              <div className="flex  gap-4 justify-center items-center h-24">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 object-contain   transition duration-300"
                />
                <p className='text-sm'>{partner.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Partners;
