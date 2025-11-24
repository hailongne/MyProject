import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import ProductSection from '../components/ProductSection';
import DealHot from '../components/DealHot';

export default function HomePage() {
  const [searchType, setSearchType] = useState('flight');
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  // const [featuredBookings, setFeaturedBookings] = useState([]);


  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', { searchType, destination, checkIn, checkOut });
  };

  // Tạm thời tắt API call bookings - sẽ implement sau
  // useEffect(() => {
  //   async function fetchBookings() {
  //     try {
  //       const res = await fetch('http://localhost:3000/api/bookings');
  //       if (res.ok) {
  //         const data = await res.json();
  //         setFeaturedBookings(data);
  //       } else {
  //         // API chưa có sẵn, bỏ qua không hiển thị featured bookings
  //         console.log('API bookings chưa sẵn sàng');
  //       }
  //     } catch (error) {
  //       console.log('Không thể kết nối API bookings:', error.message);
  //     }
  //   }
  //   fetchBookings();
  // }, []);


  return (
    <div className="w-full bg-gray-50 overflow-x-hidden">
      {/* Banner Component */}
      <Banner />

      {/* Mobile Search Form */}
      <section className="md:hidden w-full max-w-7xl mx-auto px-4 md:px-6 -mt-12 relative z-30 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <form onSubmit={handleSearch} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Địa điểm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="1 người"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-orange-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Tìm kiếm
            </button>
          </form>
        </div>
      </section>

      {/* Product Section */}
      <ProductSection />

      {/* Deal Hot Section */}
      <DealHot />

    </div>
  );
}
