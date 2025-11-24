import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Form states
  const [product, setProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('ngoai-tinh'); 
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [expandDescription, setExpandDescription] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6">Đang tải sản phẩm...</div>;

  // const product = products[id] || products[1];
  const pricePerAdult = product.price;
  const pricePerChild = Math.round(product.price * 0.5);
  const pricePerSenior = Math.round(product.price * 0.8);

  const totalTickets = adults + children + seniors;
  const totalPrice = (adults * pricePerAdult) + (children * pricePerChild) + (seniors * pricePerSenior);

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const minDate = getMinDate();

  const handleAddToCart = () => {
    if (totalTickets === 0) {
      alert('Vui lòng chọn ít nhất 1 vé');
      return;
    }
    if (!selectedDate || !selectedArea || !selectedTime) {
      alert('Vui lòng chọn ngày, khu vực và khung giờ');
      return;
    }

    const bookingData = {
      product: product.title,
      productImage: product.image,
      productLocation: product.location,
      date: selectedDate,
      type: selectedType,
      area: selectedArea,
      time: selectedTime,
      adults,
      children,
      seniors,
      totalTickets,
      totalPrice,
      pricePerAdult,
      pricePerChild,
      pricePerSenior,
    };

    navigate('/checkout', { state: bookingData });
  };

  return (
    <div className="w-full bg-gray-50 pb-12">
      {/* Back Button - Desktop only */}
      <div className="hidden md:block pt-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-2"
          >
            ← Quay lại
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Image & Description (Desktop) */}
          <div className="hidden lg:block">
            {/* Product Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-72 object-cover"
              />

              <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-4 py-2 font-bold text-sm">
                {product.discount}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-gray-800 mb-3">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="bg-white rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400 text-lg">⭐</span>
                <span className="font-bold">{product.rating}</span>
                <span className="text-gray-500 text-sm">
                  ({product.reviews.toLocaleString('vi-VN')} đánh giá)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {expandDescription ? product.description : product.description.substring(0, 150) + '...'}
              </p>
              {!expandDescription && (
                <button
                  onClick={() => setExpandDescription(true)}
                  className="text-orange-500 hover:text-orange-600 font-semibold text-sm mt-2"
                >
                  Đọc thêm
                </button>
              )}
              {expandDescription && (
                <button
                  onClick={() => setExpandDescription(false)}
                  className="text-orange-500 hover:text-orange-600 font-semibold text-sm mt-2"
                >
                  Thu gọn
                </button>
              )}
            </div>
          </div>

          {/* Mobile View*/}
          <div className="lg:col-span-2">
            {/* Mobile Header */}
            <div className="lg:hidden mb-4 bg-white rounded-xl overflow-hidden shadow-md p-3">
              <div className="flex gap-3">
                {/* Image */}
                <div className="relative flex-shrink-0 w-24">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 font-bold text-xs">
                    {product.discount}
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <h1 className="text-[1.2rem] font-bold text-gray-800 line-clamp-2">
                    {product.title}
                  </h1>
                  <div className="space-y-1">
                    {/* Rating */}
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-sm">5 ⭐</span>
                      <span className="font-bold text-xs">{product.rating}</span>
                      <span className="text-gray-500 text-xs">
                        ({(product.reviews / 1000).toFixed(1)}k đánh giá)
                      </span>
                    </div>
                    {/* Short Description */}
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {product.description.substring(0, 80)}...
                      <button 
                        onClick={() => setExpandDescription(true)}
                        className="text-orange-500 hover:text-orange-600 font-semibold ml-1"
                      >
                        Đọc thêm
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 hidden md:block">
                📋 Thông tin đặt vé
              </h2>

              {/* MOBILE & DESKTOP */}
              <div className="space-y-4 md:space-y-6">
                {/* Ngày */}
                <div>
                  <label className="block text-gray-800 font-semibold text-sm mb-2">
                    🗓️ Chọn ngày
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={minDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    * Vui lòng chọn từ ngày mai trở đi
                  </p>
                </div>

                {/* Đối tượng */}
                <div>
                  <label className="block text-gray-800 font-semibold text-sm mb-2">
                    👥 Đối tượng
                  </label>
                  <div className="flex gap-3 md:gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="ngoai-tinh"
                        checked={selectedType === 'ngoai-tinh'}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Ngoài tỉnh</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="noi-tinh"
                        checked={selectedType === 'noi-tinh'}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Nội tỉnh</span>
                    </label>
                  </div>
                </div>

                {/* Khu vực */}
                <div>
                  <label className="block text-gray-800 font-semibold text-sm mb-2">
                    📍 Khu vực
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="">-- Chọn khu vực --</option>
                    {product.areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Khung giờ */}
                <div>
                  <label className="block text-gray-800 font-semibold text-sm mb-2">
                    ⏰ Khung giờ
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {product.timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                          selectedTime === slot
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-800 border border-gray-300 hover:border-orange-500'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-300" />

                {/* Số lượng người */}
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4">👥 Số lượng vé</h3>

                  {/* Người lớn */}
                  <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Người lớn</p>
                      <p className="text-xs text-gray-600">{pricePerAdult.toLocaleString('vi-VN')}₫</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAdults(Math.max(0, adults - 1))}
                        className="w-7 h-7 md:w-8 md:h-8 border border-gray-300 rounded hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center"
                      >
                        −
                      </button>
                      <div className="w-7 md:w-8 text-center font-semibold text-sm md:text-base text-gray-800">{adults}</div>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-7 h-7 md:w-8 md:h-8 border border-gray-300 rounded hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Trẻ em */}
                  <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Trẻ em</p>
                      <p className="text-xs text-gray-600">{pricePerChild.toLocaleString('vi-VN')}₫</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-7 h-7 md:w-8 md:h-8 border border-gray-300 rounded hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center"
                      >
                        −
                      </button>
                      <div className="w-7 md:w-8 text-center font-semibold text-sm md:text-base text-gray-800">{children}</div>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-7 h-7 md:w-8 md:h-8 border border-gray-300 rounded hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Người cao tuổi */}
                  <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Người cao tuổi</p>
                      <p className="text-xs text-gray-600">{pricePerSenior.toLocaleString('vi-VN')}₫</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSeniors(Math.max(0, seniors - 1))}
                        className="w-7 h-7 md:w-8 md:h-8 border border-gray-300 rounded hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center"
                      >
                        −
                      </button>
                      <div className="w-7 md:w-8 text-center font-semibold text-sm md:text-base text-gray-800">{seniors}</div>
                      <button
                        onClick={() => setSeniors(seniors + 1)}
                        className="w-7 h-7 md:w-8 md:h-8 border border-gray-300 rounded hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-300" />

                {/* Summary */}
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Tổng vé:</span>
                    <span className="font-bold text-gray-800">{totalTickets} vé</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-700 font-semibold">Tổng tiền:</span>
                    <span className="text-lg md:text-2xl font-bold text-orange-500">
                      {totalPrice.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition text-base"
                  >
                    Đặt vé ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
