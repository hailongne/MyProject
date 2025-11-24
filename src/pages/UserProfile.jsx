import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('profile'); // 'profile', 'booking', 'orderDetail'
  const [selectedStatus, setSelectedStatus] = useState('success'); // 'success', 'pending', 'cancelled'
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order for detail view
  const [bookingHistory, setBookingHistory] = useState([]);

  
  const [formData, setFormData] = useState({
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    email: 'nguyenvana@gmail.com',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('http://localhost:3000/api/user/1');
        const data = await res.json();
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          avatar: data.avatar,
        });
        setBookingHistory(data.history); // lấy lịch sử từ API
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu người dùng:', err);
      }
    }
    fetchUser();
  }, []);


  const getStatusLabel = (status) => {
    switch (status) {
      case 'success':
        return 'Thành công';
      case 'pending':
        return 'Chờ thanh toán';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return '';
    }
  };

  const filteredBookings = bookingHistory.filter(booking => booking.status === selectedStatus);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors(prev => ({
          ...prev,
          avatar: 'Dung lượng file không quá 5MB'
        }));
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          avatar: 'Chỉ chấp nhận file *.JPG, *.PNG'
        }));
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Tên không được để trống';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Họ không được để trống';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    return newErrors;
  };

  const handleSave = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/user/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      alert(result.message || 'Cập nhật thành công!');
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
      alert('Có lỗi xảy ra khi cập nhật');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar - Menu */}
          <div className="hidden md:block md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md h-fit">
              <nav className="space-y-0">
                <button
                  onClick={() => setCurrentPage('profile')}
                  className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between font-semibold border-b border-gray-200 ${
                    currentPage === 'profile' ? 'text-gray-800 bg-orange-50' : 'text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    Thông tin hồ sơ
                  </span>
                  <span>›</span>
                </button>
                <button
                  onClick={() => setCurrentPage('booking')}
                  className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between font-semibold border-b border-gray-200 ${
                    currentPage === 'booking' ? 'text-gray-800 bg-orange-50' : 'text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    Lịch sử đặt vé
                  </span>
                  <span>›</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full text-left px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between font-semibold text-gray-700 border-b border-gray-200"
                >
                  <span className="flex items-center gap-3">
                    Giới thiệu
                  </span>
                  <span>›</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full text-left px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between font-semibold text-gray-700 border-b border-gray-200"
                >
                  <span className="flex items-center gap-3">
                    Điều khoản và điều kiện
                  </span>
                  <span>›</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full text-left text-red-600 px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between font-semibold"
                >
                  <span className="flex items-center gap-3">
                    Đăng xuất
                  </span>
                  <span>›</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-4">
            {/* Profile Page */}
            {currentPage === 'profile' && (
              <form onSubmit={handleSave} className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  Thông tin
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Avatar Section */}
                  <div className="md:col-span-1 flex flex-col items-center">
                    <div className="relative w-40 h-40 mb-4">
                      <img
                        src={formData.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full border-4 border-orange-500 shadow-lg"
                      />
                      <label htmlFor="avatar-input" className="absolute bottom-2 right-2 bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-900 transition shadow-lg text-lg">
                        📷
                      </label>
                      <input
                        id="avatar-input"
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </div>
                    {errors.avatar && (
                      <p className="text-red-500 text-xs text-center mt-2">{errors.avatar}</p>
                    )}
                    <p className="text-xs text-gray-500 text-center mt-3">
                      Dung lượng: &lt;5M<br />
                      Chỉ chấp nhận các định dạng<br />
                      *.JPG, *.PNG
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="md:col-span-2">
                    {/* First Name Field */}
                    <div className="mb-6">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Nhập tên của bạn"
                        className={`w-full px-4 py-3 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-gray-50 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    {/* Last Name Field */}
                    <div className="mb-6">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Nhập họ của bạn"
                        className={`w-full px-4 py-3 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-gray-50 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-6">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Nhập email của bạn"
                        className={`w-full px-4 py-3 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-gray-50 ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex flex-col md:flex-row gap-3 md:justify-end mt-8">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('booking')}
                    className="md:hidden bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-full transition text-base"
                  >
                    Lịch sử đơn hàng
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-full transition text-base"
                  >
                    {isLoading ? 'Đang lưu...' : 'Lưu thông tin'}
                  </button>
                </div>
              </form>
            )}

            {/* Booking History Page */}
            {currentPage === 'booking' && (
              <div className="bg-white rounded-xl max-h-[555px] p-3 md:p-8 shadow-md">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                  📋 Lịch sử đặt vé
                </h2>

                {/* Status Filter Tabs - Mobile Optimized */}
                <div className="flex gap-1 md:gap-4 mb-4 md:mb-6 border-b border-gray-200 overflow-x-auto pb-2 md:pb-4">
                  <button
                    onClick={() => setSelectedStatus('success')}
                    className={`px-2 md:px-6 py-1.5 md:py-3 font-bold text-xs md:text-sm border-b-2 transition whitespace-nowrap ${
                      selectedStatus === 'success'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    ✓ Thành công
                  </button>
                  <button
                    onClick={() => setSelectedStatus('pending')}
                    className={`px-2 md:px-6 py-1.5 md:py-3 font-bold text-xs md:text-sm border-b-2 transition whitespace-nowrap ${
                      selectedStatus === 'pending'
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    ⏳ Chờ thanh toán
                  </button>
                  <button
                    onClick={() => setSelectedStatus('cancelled')}
                    className={`px-2 md:px-6 py-1.5 md:py-3 font-bold text-xs md:text-sm border-b-2 transition whitespace-nowrap ${
                      selectedStatus === 'cancelled'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    ✕ Đã hủy
                  </button>
                </div>

                {/* Booking List - Mobile Friendly */}
                <div className="space-y-2 md:space-y-4 max-h-[320px] overflow-y-auto">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-2.5 md:p-5 hover:border-orange-400 hover:shadow-lg transition-all bg-white"
                      >
                        {/* Header with Image and Status */}
                        <div className="flex gap-2 md:gap-4 mb-2 md:mb-4">
                          {/* Product Image */}
                          <img
                            src={booking.image}
                            alt={booking.product}
                            className="w-16 h-16 md:w-24 md:h-24 rounded-lg object-cover flex-shrink-0 shadow-sm"
                          />

                          {/* Main Info */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-gray-800 text-xs md:text-base mb-0.5 md:mb-1 line-clamp-2">
                                {booking.product}
                              </h3>
                              <p className="text-xs text-gray-600">
                                <span className="font-mono font-bold text-orange-600">{booking.id}</span>
                              </p>
                            </div>
                            
                            {/* Status Badge */}
                            <div className="mt-1 md:mt-2">
                              <span
                                className={`inline-block px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold border ${getStatusColor(
                                  booking.status
                                )}`}
                              >
                                {getStatusLabel(booking.status)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Info - Simple 2 Column */}
                        <div className="grid grid-cols-2 gap-3 mb-2 md:mb-3 pb-2 md:pb-3 border-b border-gray-200 text-xs md:text-sm">
                          <div>
                            <p className="text-gray-600">📍 Địa điểm</p>
                            <p className="font-bold text-gray-800">{booking.location}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">🗓️ Ngày đặt</p>
                            <p className="font-bold text-gray-800">
                              {new Date(booking.date).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">🎫 Số vé</p>
                            <p className="font-bold text-gray-800">{booking.tickets}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">💰 Tổng tiền</p>
                            <p className="font-bold text-orange-600">
                              {booking.price.toLocaleString('vi-VN')} VND
                            </p>
                          </div>
                        </div>

                        {/* Footer with Date and Button */}
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-gray-500 md:text-sm">
                            🕐 {booking.bookingDate}
                          </p>
                          <button 
                            onClick={() => {
                              setSelectedOrder(booking);
                              setCurrentPage('orderDetail');
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-2 md:px-4 py-1.5 md:py-2 rounded text-xs md:text-sm transition-all hover:shadow-md flex-shrink-0"
                          >
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 md:py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                      <p className="text-2xl md:text-4xl mb-2">📭</p>
                      <p className="text-gray-600 text-xs md:text-base font-semibold">
                        Không có đơn hàng {selectedStatus === 'success' ? 'thành công' : selectedStatus === 'pending' ? 'chờ thanh toán' : 'đã hủy'}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 md:mt-2">
                        Hãy đặt vé để xem lịch sử
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Detail Page */}
            {currentPage === 'orderDetail' && selectedOrder && (
              <div className="bg-white rounded-xl p-3 md:p-6 shadow-md">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-200">
                  <div>
                    <h2 className="text-lg md:text-2xl font-bold text-gray-800">Chi tiết đơn hàng</h2>
                    <p className="text-xs md:text-sm text-gray-600">Mã: <span className="font-mono font-bold text-orange-500">{selectedOrder.id}</span></p>
                  </div>
                  <button onClick={() => { setCurrentPage('booking'); setSelectedOrder(null); }} className="text-gray-600 hover:text-gray-800 font-bold text-lg">✕</button>
                </div>

                {/* Main Info - Compact */}
                <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                  {/* Product + Image */}
                  <div className="flex gap-2 md:gap-3 pb-2 md:pb-3 border-b border-gray-200">
                    <img src={selectedOrder.image} alt={selectedOrder.product} className="w-14 h-14 md:w-16 md:h-16 rounded object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-1">{selectedOrder.product}</h4>
                      <p className="text-xs text-gray-600">📍 {selectedOrder.location}</p>
                      <p className="text-xs text-gray-600">🗓️ {selectedOrder.date}</p>
                    </div>
                  </div>

                  {/* Ticket Breakdown */}
                  <div className="text-xs md:text-sm space-y-1 pb-2 md:pb-3 border-b border-gray-200">
                    {selectedOrder.adults > 0 && <p className="text-gray-700">👨 Người lớn: {selectedOrder.adults} × {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.pricePerAdult)}
                      = {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.adults * selectedOrder.pricePerAdult)}</p>}
                    {selectedOrder.children > 0 && <p className="text-gray-700">👧 Trẻ em: {selectedOrder.children} × {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.pricePerChild)} = {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.children * selectedOrder.pricePerChild)}</p>}
                    {selectedOrder.seniors > 0 && <p className="text-gray-700">👴 Cao tuổi: {selectedOrder.seniors} × {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.pricePerSenior)} = {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.seniors * selectedOrder.pricePerSenior)} </p>}
                  </div>

                  {/* Summary + Status */}
                  <div className="flex items-center justify-between pb-2 md:pb-3 border-b border-gray-200">
                    <div className="text-xs md:text-sm text-gray-700">
                      <p>🎫 {selectedOrder.tickets} vé | 💰 {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.price)}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusLabel(selectedOrder.status)}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="text-xs text-gray-600">
                    <p>📅 Đặt: {selectedOrder.bookingDate} | 💳 QR Payment</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 md:space-y-3">
                  {selectedOrder.status === 'pending' && (
                    <div className="flex gap-2 md:gap-3">
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 md:py-2.5 rounded text-xs md:text-sm transition"
                      >
                        Thanh toán
                      </button>
                      <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 md:py-2.5 rounded text-xs md:text-sm transition">
                        In đơn
                      </button>
                    </div>
                  )}

                  {selectedOrder.status === 'success' && (
                    <div className="flex gap-2 md:gap-3">
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-2.5 rounded text-xs md:text-sm transition">
                        Tải vé
                      </button>
                      <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 md:py-2.5 rounded text-xs md:text-sm transition">
                        In đơn
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showPaymentModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Xác nhận thanh toán
              </h3>
              <p className="text-gray-600 text-sm">
                Vui lòng kiểm tra thông tin trước khi thanh toán
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-sm">Mã đơn hàng</span>
                <span className="font-mono font-bold text-orange-500">{selectedOrder.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-sm">Sản phẩm</span>
                <span className="font-semibold text-gray-800 text-right text-sm">
                  {selectedOrder.product}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-sm">Số vé</span>
                <span className="font-semibold text-gray-800">{selectedOrder.tickets} vé</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex items-center justify-between pt-2">
                <span className="text-gray-700 font-semibold">Tổng tiền</span>
                <span className="text-2xl font-bold text-orange-500">
                  {selectedOrder.price.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-6">
              <p className="text-yellow-800 text-sm">
                ⚠️ Sau khi thanh toán, bạn sẽ nhận được mã QR để vào cổng. Vui lòng lưu lại thông tin này.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setShowConfirmModal(true);
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition text-base"
              >
                Xác nhận thanh toán
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition text-base"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal (Processing) */}
      {showConfirmModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 text-center">
            {/* Animated Checkmark */}
            <div className="flex justify-center mb-6">
              <div className="text-6xl animate-bounce">
                ✓
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Thanh toán thành công!
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Đơn hàng của bạn đã được xác nhận
            </p>

            {/* Order Info */}
            <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-700 mb-2">
                <span className="text-gray-600">Mã đơn:</span> <span className="font-mono font-bold text-green-600">{selectedOrder.id}</span>
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="text-gray-600">Tổng tiền:</span> <span className="font-bold text-green-600">{selectedOrder.price.toLocaleString('vi-VN')}₫</span>
              </p>
              <p className="text-sm text-gray-700">
                <span className="text-gray-600">Ngày thanh toán:</span> <span className="font-semibold">{new Date().toLocaleDateString('vi-VN')}</span>
              </p>
            </div>

            {/* Message */}
            <p className="text-gray-600 text-xs mb-6">
              ✉️ Hóa đơn chi tiết sẽ được gửi đến email của bạn trong vòng 5 phút
            </p>

            {/* Action Button */}
            <button
              onClick={() => {
                setShowConfirmModal(false);
                setShowPaymentModal(false);
                setCurrentPage('booking');
                setSelectedOrder(null);
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition text-base"
            >
              Hoàn tất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
