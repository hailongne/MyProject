import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  // Đóng tất cả dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/images/sunworldlogo.png"
            alt="logo"
            className="h-7 md:h-8 w-auto"
          />
        </Link>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 md:gap-5">

          {/* CART ICON */}
          <Link to="/" className="relative hover:opacity-70 transition flex-shrink-0">
            <img src="/images/iconcart.png" alt="cart" className="h-5 w-auto" />
            <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
          </Link>

          {/* USER DROPDOWN */}
          <div className="relative z-40 hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                setIsMenuOpen(false); // đóng menu mobile nếu đang mở
              }}
              className="flex items-center gap-2 hover:opacity-70 transition"
            >
              <img src="/images/iconiconicon.png" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user?.name || 'Khách'}</span>
              <span className="text-sm hidden sm:inline">☰</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                {user ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-black text-sm hover:bg-gray-50">Thông tin</Link>
                    <Link to="/" className="block px-4 py-2 text-black text-sm hover:bg-gray-50">Giới thiệu</Link>
                    <Link to="/" className="block px-4 py-2 text-black text-sm hover:bg-gray-50">Hỗ trợ</Link>
                    <Link to="/" className="block px-4 py-2 text-black text-sm hover:bg-gray-50">Điều khoản</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 text-black text-sm hover:bg-gray-50">Đăng nhập</Link>
                    <Link to="/register" className="block px-4 py-2 text-black text-sm hover:bg-gray-50">Đăng ký</Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* MOBILE / TABLET MENU BUTTON */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsDropdownOpen(false); // đóng user dropdown nếu đang mở
            }}
            className="lg:hidden text-gray-700 text-2xl hover:opacity-70"
          >
            ☰
          </button>

          {/* PC BUTTONS */}
          <button className="hidden lg:inline bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700">Đặt App</button>
          <button className="hidden lg:inline bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700">Hỗ trợ</button>
        </div>
      </div>

      {/* TABLET / MOBILE MENU */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white fixed inset-0 top-16 z-40 overflow-y-auto">
          <nav className="flex flex-col">
            <Link to="/profile" className="px-4 py-3 text-black border-b hover:bg-gray-50">Chỉnh sửa thông tin</Link>
            <Link to="/" className="px-4 py-3 text-black border-b hover:bg-gray-50">Giới thiệu</Link>
            <Link to="/" className="px-4 py-3 text-black border-b hover:bg-gray-50">Hỗ trợ</Link>
            <Link to="/" className="px-4 py-3 text-black border-b hover:bg-gray-50">Điều khoản</Link>
            <button onClick={handleLogout} className="px-4 py-3 text-left text-red-600 border-b hover:bg-gray-50">Đăng xuất</button>
          </nav>
          <div className="px-4 py-6 mt-4 border-t">
            <p className="text-center text-gray-600 text-xs font-medium mb-3">Get Sun Paradise App</p>
            <div className="flex gap-2 justify-between">
              <a href="#" className="w-1/2">
                <img src="/images/appstore.png" alt="App Store" className="w-full h-auto rounded" />
              </a>
              <a href="#" className="w-1/2">
                <img src="/images/chplay.png" alt="Google Play" className="w-full h-auto rounded" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}