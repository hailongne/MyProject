import { useState, useEffect } from 'react';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [quantity, setQuantity] = useState('');

  const banners = [
    {
      id: 1,
      bgColor: 'from-blue-700 to-blue-900',
      url: 'https://vpq.vn/bai-viet/Sun-wrold-h%C3%B2n-th%C6%A1m.jpg',
    },
    {
      id: 2,
      bgColor: 'from-purple-600 to-purple-900',
      url: 'https://honthom.sunworld.vn/wp-content/uploads/2019/01/LHHHT-1920x1080px-web-1024x576.jpg',
    },
    {
      id: 3,
      bgColor: 'from-orange-600 to-red-900',
      url: 'https://onetour.vn/Media/Images/tour-tron-goi/2024/09/t8-mail-onetour.jpg',
    }
  ];

  // Auto-scroll carousel mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', { destination, checkIn, quantity });
  };

  return (
    <section className="w-full max-w-10xl mx-auto px-4 md:px-6 pt-4 md:pt-6">
      <div className="w-full relative h-50 md:h-[500px] overflow-hidden rounded-3xl">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 rounded-3xl ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-1000 bg-cover bg-center`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 100%), url('${banner.url}')`,
            }}
          />
        ))}

        {/* Search Form - Bottom Right (Desktop Only) */}
        <div className="hidden md:block absolute bottom-6 right-6 z-30 bg-white rounded-2xl shadow-xl p-4 w-auto min-w-96">
          <form onSubmit={handleSearch} className="space-y-3">
            {/* 3 Inputs - Horizontal */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Địa điểm</label>
                <input
                  type="text"
                  placeholder="Chọn địa điểm"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Ngày đi</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Số lượng</label>
                <input
                  type="text"
                  placeholder="1 người"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Checkbox & Button */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  defaultChecked
                />
                <span className="text-xs text-gray-700">Ngày đi linh hoạt</span>
              </label>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-lg transition text-xs whitespace-nowrap"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
