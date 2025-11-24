import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:3000/api/products');
        if (!res.ok) throw new Error('Không tải được sản phẩm');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const formatPrice = (price) => price.toLocaleString('vi-VN');

  if (loading) return <div className="p-6">Đang tải sản phẩm...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  return (
    <section className="w-full bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-xl md:text-4xl font-bold text-gray-800">
            Trải nghiệm mới nhất
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col md:flex-col no-underline"
          >
            {/* Image Container */}
            <div className="relative h-20 md:h-50 bg-gray-200 overflow-hidden rounded-3xl m-3 flex-shrink-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              
              {/* Discount Badge */}
              <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-center flex-col">
                <span className="text-xs font-bold">{product.discount}</span>
              </div>

              {/* Date Range */}
              <div className="hidden absolute bottom-3 left-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-xs text-center font-semibold">
                {product.dateRange}
              </div>
            </div>

            {/* Content */}
            <div className="px-3 md:px-4 pb-3 md:pb-4 flex-grow flex flex-col">
              {/* Title */}
              <h3 className="font-bold text-gray-800 text-xs md:text-base mb-1 md:mb-2 line-clamp-2">
                {product.title}
              </h3>

              {/* Badge - Mobile Only */}
              <div className="md:hidden mb-1">
                {product.badge && (
                  <div className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold border border-green-300 mr-1">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Location - Hidden on Mobile */}
              <div className="hidden md:flex items-center gap-1 mb-2">
                <span className="text-gray-500 text-xs">📍</span>
                <p className="text-gray-500 text-5xs">{product.location}</p>
              </div>

              {/* Rating - Hidden on Mobile */}
              <div className="hidden md:flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-sm">⭐</span>
                <span className="text-gray-700 text-xs font-semibold">{product.rating}</span>
                <span className="text-gray-400 text-xs">({product.reviews.toLocaleString('vi-VN')} đánh giá)</span>
              </div>

              {/* Price */}
              <div className="mb-2 md:mb-3 mt-auto">
                <div className="grid grid-1 items-baseline gap-1 md:gap-2">
                  <span className="text-gray-400 line-through text-[10px] md:text-sm">
                    {formatPrice(product.originalPrice)} ₫
                  </span>
                  <span className="text-orange-500 font-bold text-sm md:text-xl">
                    {formatPrice(product.price)} ₫
                  </span>
                </div>
              </div>

              {/* Reviews count - Mobile only */}
              <p className="md:hidden text-gray-400 text-[8px] mb-2">63,945 đã bán</p>

              {/* Book Button */}
              <button className="w-full border-2 border-orange-500 text-orange-500 py-2 md:py-2 rounded-full font-semibold hover:bg-orange-50 transition text-xs md:text-base">
                Đặt vé
              </button>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
