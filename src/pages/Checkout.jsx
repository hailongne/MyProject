import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [showQRModal, setShowQRModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Generate booking code
  const generateBookingCode = () => {
  const randomNumbers = Math.floor(Math.random() * 1000);
  return 'ORD' + String(randomNumbers).padStart(3, '0');
  };

  const handleQRPayment = () => {
    setShowQRModal(true);
  };

  const handleConfirmPayment = () => {
    setShowQRModal(false);
    setShowConfirmModal(true);
  };

  const handleCompletePayment = () => {
    const code = generateBookingCode();
    setBookingCode(code);
    setShowConfirmModal(false);
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="w-full bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Đặt hàng thành công!</h1>
          <p className="text-gray-600 mb-6">Cảm ơn bạn đã tin tưởng chúng tôi</p>

          {/* Booking Code */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 mb-6">
            <p className="text-gray-600 text-sm mb-2">Mã đặt chỗ</p>
            <p className="text-2xl font-bold text-orange-500 font-mono">{bookingCode}</p>
          </div>

          {/* Product Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Thông tin đặt vé</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Sản phẩm:</span>
                <span className="font-semibold text-gray-800">{bookingData.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày:</span>
                <span className="font-semibold text-gray-800">{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Khung giờ:</span>
                <span className="font-semibold text-gray-800">{bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng vé:</span>
                <span className="font-semibold text-gray-800">{bookingData.totalTickets} vé</span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between">
                <span className="text-gray-600 font-semibold">Tổng tiền:</span>
                <span className="font-bold text-orange-500 text-lg">{bookingData.totalPrice?.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <p className="text-gray-600 text-sm mb-6">
            Vé của bạn đã được xác nhận. Chúng tôi sẽ gửi thông tin chi tiết qua email trong vòng 1 phút. Hoặc là bạn có thể xem lại thông tin vé trong hồ sơ của mình.
          </p>

          {/* Manual Button */}
          <button
            onClick={() => navigate('/profile')}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl transition mt-6"
          >
            Quay về hồ sơ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-6 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-2 mb-3"
          >
            ← Quay lại
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Thanh toán</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
          {/* Main Content - Left */}
            {/* Booking Summary */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">📋 Thông tin đặt vé</h2>
              {/* Product */}

              <div className="flex gap-3 md:gap-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-200">
                <img
                  src={bookingData.productImage}
                  alt={bookingData.product}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base line-clamp-2">{bookingData.product}</h3>
                  <p className="text-xs md:text-sm text-gray-600">📍 {bookingData.location}</p>
                </div>
              </div>
              {/* Details Grid */}

              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <p className="text-xs text-gray-600 mb-1">Ngày</p>
                  <p className="font-bold text-sm md:text-base text-gray-800">{bookingData.date}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <p className="text-xs text-gray-600 mb-1">Khung giờ</p>
                  <p className="font-bold text-sm md:text-base text-gray-800">{bookingData.time}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <p className="text-xs text-gray-600 mb-1">Khu vực</p>
                  <p className="font-bold text-sm md:text-base text-gray-800 line-clamp-1">{bookingData.area}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <p className="text-xs text-gray-600 mb-1">Đối tượng</p>
                  <p className="font-bold text-sm md:text-base text-gray-800">
                    {bookingData.type === 'ngoai-tinh' ? 'Ngoài tỉnh' : 'Nội tỉnh'}
                  </p>
                </div>
              </div>
            </div>
            {/* Ticket Breakdown */}

            <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6">
              <p className="text-sm md:text-base font-semibold text-gray-800 mb-3 md:mb-4">Chi tiết vé</p>
              <div className="space-y-2 text-xs md:text-sm">
                {bookingData.adults > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Người lớn ({bookingData.adults}x)</span>
                    <span className="font-semibold text-gray-800">
                      {(582000 * bookingData.adults).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                )}
                {bookingData.children > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trẻ em ({bookingData.children}x)</span>
                    <span className="font-semibold text-gray-800">
                      {Math.round(582000 * 0.5 * bookingData.children).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                )}
                {bookingData.seniors > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Người cao tuổi ({bookingData.seniors}x)</span>
                    <span className="font-semibold text-gray-800">
                      {Math.round(582000 * 0.8 * bookingData.seniors).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Payment Method */}

            <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">💳 Phương thức thanh toán</h2>

              <div className="space-y-3">
                <label className="flex items-center p-3 md:p-4 border-2 border-orange-400 rounded-lg cursor-pointer bg-orange-50">
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 md:w-5 md:h-5 text-orange-500"
                  />
                  <div className="ml-2 md:ml-3 flex-1">
                    <p className="font-semibold text-sm md:text-base text-gray-800">Thanh toán QR</p>
                    <p className="text-xs md:text-sm text-gray-600">Quét mã QR để thanh toán</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary - Right */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 sticky top-4">
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Tóm tắt đơn hàng</h3>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-200">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Tổng vé</span>
                  <span className="font-semibold text-gray-800">{bookingData.totalTickets} vé</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Tiền vé</span>
                  <span className="font-semibold text-gray-800">
                    {bookingData.totalPrice?.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-4 md:mb-6">
                <span className="text-sm md:text-base text-gray-700 font-semibold">Tổng cộng</span>
                <span className="text-xl md:text-3xl font-bold text-orange-500">
                  {bookingData.totalPrice?.toLocaleString('vi-VN')}₫
                </span>
              </div>

              <button
                onClick={handleQRPayment}
                disabled={!paymentMethod}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-2 md:py-3 rounded-lg md:rounded-xl transition text-sm md:text-lg"
              >
                Thanh toán QR
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Bằng cách thanh toán, bạn đồng ý với<br />
                <a href="#" className="text-orange-500 hover:underline">
                  Điều khoản & Chính sách
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Payment Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Thanh toán QR</h3>
              <p className="text-gray-600">Vui lòng quét mã QR bên dưới để thanh toán</p>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 flex items-center justify-center mb-6 aspect-square">
              <div className="text-center">
                <svg className="w-32 h-32 mx-auto text-blue-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h8v8h-8v-8zm2 2v4h4v-4h-4z" />
                </svg>
                <p className="text-sm text-gray-600">Mã QR thanh toán</p>
              </div>
            </div>

            {/* Amount */}
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-6 text-center">
              <p className="text-gray-600 text-sm mb-1">Số tiền thanh toán</p>
              <p className="text-3xl font-bold text-orange-500">
                {bookingData.totalPrice?.toLocaleString('vi-VN')}₫
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Xác nhận đã thanh toán
              </button>
              <button
                onClick={() => setShowQRModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition"
              >
                Huỷ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-orange-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">Xác nhận thanh toán</h3>
            <p className="text-gray-600 mb-6">
              Chúng tôi đã nhận được thanh toán của bạn. Đang xử lý...
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">ℹ️ Lưu ý:</span> Vui lòng không tắt trang này cho đến khi nhìn thấy thông báo xác nhận.
              </p>
            </div>

            <button
              onClick={handleCompletePayment}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-xl transition text-lg"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
