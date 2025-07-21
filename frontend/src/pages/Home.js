import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
  const slides = [
    'https://cdn.prod.website-files.com/640051ce8a159067e1042e74/65d5b19950d874f282b5c35f_woman-with-gloves-cleaning-floor_23-2148520978.jpg', // Cleaning
    'https://media.istockphoto.com/id/169270331/photo/electrician-working-in-living-room.jpg?s=612x612&w=0&k=20&c=Ped28fpOSCWbhG9rlyJ0-urZJAdPNSqQPUP0fd-k50o=', // Electrician
    'https://media.istockphoto.com/id/183953925/photo/young-plumber-fixing-a-sink-in-bathroom.jpg?s=612x612&w=0&k=20&c=Ps2U_U4_Z60mIZsuem-BoaHLlCjsT8wYWiXNWR-TCDA=', // Plumber
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-10 px-4">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to QuickFix</h1>
        <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
          Book trusted home services — from cleaning to electricians — all in one place.
        </p>
        <Link to="/services">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 text-lg transition">
            Explore Services
          </button>
        </Link>
      </section>

      {/* Swiper Carousel with Only Images */}
      <section className="max-w-7xl mx-auto mb-16 px-4">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="rounded-xl shadow-lg overflow-hidden"
        >
          {slides.map((img, index) => (
            <SwiperSlide key={index}>
  <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
    <img
      src={img}
      alt={`Slide ${index + 1}`}
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
  </div>
</SwiperSlide>


          ))}
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">Why Choose QuickFix?</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>✔ Verified and skilled professionals</li>
          <li>✔ Simple and quick booking process</li>
          <li>✔ Trusted by 100+ customers</li>
          <li>✔ Secure payments and on-time service</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
