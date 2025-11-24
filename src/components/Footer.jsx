import { useState, useEffect } from 'react';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full bg-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Logo & Copyright */}
        <div className="mb-8">
          <img src="/images/sunworldlogo.png" width={200} className='mb-10'/>
          <p className="text-gray-700 text-sm">
            ©2024 Sun World. Đã đăng ký bản quyền tại Việt Nam
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 mb-8">
          <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Về Sun World
          </a>
          <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Điều khoản và quyền riêng tư
          </a>
          <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Liên hệ
          </a>
        </div>

        {/* Business Info */}
        <div className="mb-8">
          <p className="text-gray-700 text-sm mb-3">
            Thông tin đăng ký doanh nghiệp: Giấy chứng nhận đăng ký kinh doanh số 0401805040 ngày 14/12/2016 (đăng ký lần đầu). Đăng ký bổ sung, thay đổi thông tin được cập nhật khi cần.
          </p>
          <p className="text-gray-700 text-sm mb-3">
            Nơi cấp: Sở Kế hoạch và Đầu tư Thành phố Đà Nẵng
          </p>
          <p className="text-gray-700 text-sm mb-3">
            Lĩnh vực hoạt động: Hoạt động vui chơi giải trí và các dịch vụ lưu trú; Dịch vụ ăn uống và du lịch
          </p>
        </div>

        {/* Locations */}
        <div className="mb-8 space-y-3">
          <div className="flex gap-3">
            <span className="text-orange-500 text-lg flex-shrink-0">📍</span>
            <div>
              <p className="text-gray-800 font-semibold text-sm">Văn phòng Sun World Hà Nội:</p>
              <p className="text-gray-700 text-sm">
                Tầng 2, tòa nhà Ancora, 03 Lương Yên, Hai Bà Trưng, TP. Hà Nội, Việt Nam
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-orange-500 text-lg flex-shrink-0">📍</span>
            <div>
              <p className="text-gray-800 font-semibold text-sm">Văn phòng Sun World Đà Nẵng:</p>
              <p className="text-gray-700 text-sm">
                Tầng LIM Khách sạn Novotel Đà Nẵng, 36-38 Bạch Đằng, Thạch Thang, Hải Châu, Đà Nẵng
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <p className="text-gray-800 font-semibold text-sm mb-2">
            Hotline: <span className="font-normal">18001000</span>
          </p>
          <p className="text-gray-800 font-semibold text-sm">
            Email: <span className="font-normal text-orange-500">booking@sunworld.vn</span>
          </p>
        </div>

        {/* Certified Badge */}
        <div className="flex justify-end mb-8">
          <img src="/images/bocongthuong.png" width={150}/>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-8" />

        {/* App Download Section */}
        <div className="mb-8">
          <p className="text-gray-800 font-semibold text-sm mb-4">
            Tải ứng dụng Sun Paradise
          </p>
          <div className="flex flex-wrap gap-4 w-1/2">
            <a href="#" className="inline-block">
              <img src="/images/appstore.png" width={200}/>
            </a>
            <a href="#" className="inline-block">
              <img src="/images/chplay.png" width={200}/>
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-8" />

        {/* Bottom Copyright */}
        <div className="text-center text-gray-600 text-xs">
          <p>&copy; 2024 Sun World. All rights reserved.</p>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition shadow-lg text-xl z-40 animate-fade-in"
        >
          ↑
        </button>
      )}
    </footer>
  );
}
