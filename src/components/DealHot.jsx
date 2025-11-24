import { useEffect, useState } from 'react';

export default function DealHot() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDeals() {
      try {
        const res = await fetch('http://localhost:3000/api/dealhot');
        if (!res.ok) throw new Error('Không tải được deal hot');
        const data = await res.json();
        setDeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  const formatPrice = (price) => price.toLocaleString('vi-VN');

  if (loading) return <div className="p-6">Đang tải deal hot...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Deal Hot
          </h2>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-red-50 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              {/* Mobile Layout: Image on top */}
              <div className="md:hidden">
                {/* Image - Top for Mobile */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-center flex-col">
                    <span className="text-xs font-bold">11%</span>
                    <span className="text-xs font-bold">OFF</span>
                  </div>
                </div>

                {/*Mobile */}
                <div className="p-4 flex flex-col">
                  {/* Badge */}
                  {deal.badge && (
                    <div className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold border border-green-300 mb-2 w-fit">
                      {deal.badge.substring(0, 15)}... <span className="ml-1">+2</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-bold text-gray-800 text-sm mb-3 line-clamp-2">
                    {deal.title}
                  </h3>

                  {/* Items */}
                  <div className="mb-3 bg-white rounded-2xl p-3">
                    {deal.locations ? (
                      deal.locations.slice(0, 2).map((loc, idx) => (
                        <div key={idx} className="flex justify-between text-xs mb-1 last:mb-0">
                          <span className="text-gray-600">{loc.name}</span>
                          <span className="font-semibold text-gray-800">
                            {formatPrice(loc.price)}₫
                          </span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{deal.location1}</span>
                          <span className="font-semibold text-gray-800">
                            {formatPrice(deal.price1)}₫
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">{deal.location2}</span>
                          <span className="font-semibold text-gray-800">
                            {formatPrice(deal.price2)}₫
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Chỉ từ</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-red-600">
                        {formatPrice(deal.finalPrice)}₫
                      </span>
                      <span className="text-red-500 text-xs font-bold">-54%</span>
                    </div>
                    <span className="text-gray-400 line-through text-xs">
                      {formatPrice(deal.originalPrice)}₫
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {deal.reviews.toLocaleString('vi-VN')} đã bán
                    </p>
                  </div>

                  {/* Book Button */}
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full font-semibold transition text-sm">
                    Đặt vé
                  </button>
                </div>
              </div>

              {/* Desktop Layout: Content left, Image right */}
              <div className="hidden md:flex">
                {/* Content - Left Side */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  {/* Badge */}
                  {deal.badge && (
                    <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-300 mb-3 w-fit">
                      {deal.badge}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-bold text-gray-800 text-base mb-4 line-clamp-3">
                    {deal.title}
                  </h3>

                  {/* Items */}
                  <div className="mb-4 space-y-2">
                    {deal.locations ? (
                      deal.locations.map((loc, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-700">{loc.name}</span>
                          <span className="font-semibold text-gray-800">
                            {formatPrice(loc.price)}₫
                          </span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{deal.location1}</span>
                          <span className="font-semibold text-gray-800">
                            {formatPrice(deal.price1)}₫
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{deal.location2}</span>
                          <span className="font-semibold text-gray-800">
                            {formatPrice(deal.price2)}₫
                          </span>
                        </div>
                        {deal.location3 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">{deal.location3}</span>
                            <span className="font-semibold text-gray-800">
                              {formatPrice(deal.price3)}₫
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Chỉ từ</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-red-600">
                        {formatPrice(deal.finalPrice)}₫
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        {formatPrice(deal.originalPrice)}₫
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {deal.reviews.toLocaleString('vi-VN')} đã bán
                    </p>
                  </div>

                  {/* Book Button */}
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full font-semibold transition text-base">
                    Đặt vé
                  </button>
                </div>

                {/* Image - Right Side */}
                <div className="w-48 h-auto relative bg-gray-200">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-center flex-col">
                    <span className="text-xs font-bold">11%</span>
                    <span className="text-xs font-bold">OFF</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
