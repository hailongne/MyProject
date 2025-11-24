import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  // Đóng menu dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Đóng ngôn ngữ khi mở khách hàng và ngược lại
  const toggleDropdown = () => {
    setIsLanguageDropdown(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsLanguageDropdown(!isLanguageDropdown);
  };

  // Đóng tất cả dropdown khi click bên ngoài
  const closeAllDropdowns = () => {
    setIsDropdownOpen(false);
    setIsLanguageDropdown(false);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50" onClick={closeAllDropdowns}>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-7 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src="/images/sunworldlogo.png" 
            alt="logo" 
            className="h-6 md:h-8 w-auto"
          />
        </Link>

        {/* Right Section - Icons & Buttons */}
        <div className="flex gap-4 md:gap-5 items-center">
          {/* Icon Giỏ hàng */}
          <Link to="/" className="relative hover:opacity-70 transition flex-shrink-0">
            <img 
              src="/images/iconcart.png" 
              alt="Giỏ hàng" 
              className="h-4 md:h-5 w-auto"
            />
            <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center font-bold">0</span>
          </Link>

          {/* Customer Info & Dropdown */}
          <div className="relative z-40" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => toggleDropdown()}
              className="p-0 bg-transparent border-none cursor-pointer hover:opacity-70 transition flex items-center gap-2 flex-shrink-0"
            >
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                <img src="/images/iconiconicon.png" alt="logo" className="w-4 md:w-5 h-4 md:h-5" />
              </span>
              <span className="hidden sm:inline text-xs md:text-sm font-medium text-gray-700">{user?.name || 'Khách'}</span>
              <span className="hidden sm:inline text-xs md:text-sm font-medium text-gray-700">☰</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition text-sm"
                    >
                      <svg className="w-4 h-4 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 10a3 3 0 100-6 3 3 0 000 6zm0 1.646a4.5 4.5 0 00-4.446 3.854H5C6.1 15.951 7.967 17 10 17s3.9-1.049 4.446-2.5h-.896a4.5 4.5 0 00-4.446-3.854z" />
                      </svg>
                      <span>Thông tin</span>
                    </Link>
                <Link 
                  to="/" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition text-sm"
                >
                  <svg className="w-4 h-4 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Giới thiệu</span>
                </Link>
                <Link 
                  to="/" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition text-sm"
                >
                  <svg className="w-4 h-4 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <span>Hỗ trợ</span>
                </Link>
               <Link 
                  to="/" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition text-sm"
              >
                  <svg className="w-4 h-4 text-black flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <span>Điều khoản và điều kiện</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-gray-50 transition text-sm font-medium"
                >
                  <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm7.707 1.293a1 1 0 00-1.414 1.414L9.586 9l-1.293 1.293a1 1 0 101.414 1.414L11 10.414l1.293 1.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Đăng xuất</span>
                </button>
                </>
                ) : (
                  <div>
                  <Link
                    to="/login"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition text-sm"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition text-sm"
                  >
                    Đăng ký
                  </Link>
                </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger Menu - Mobile & Tablet */}
          <button 
            onClick={() => {
              setIsLanguageDropdown(false);
              setIsMenuOpen(!isMenuOpen);
            }}
            className="lg:hidden text-gray-700 hover:text-blue-600 transition text-2xl"
          >
            ☰
          </button>

          {/* Button Đặt App */}
          <button className="hidden md:inline-block bg-red-600 text-white px-3 lg:px-4 py-2 rounded-full hover:bg-red-700 transition text-xs lg:text-sm font-medium">
            Đặt App
          </button>

          {/* Button Hỗ trợ*/}
          <button className="hidden md:inline-block bg-red-600 text-white px-3 lg:px-4 py-2 rounded-full hover:bg-red-700 transition text-xs lg:text-sm font-medium">
            Hỗ trợ
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white fixed inset-0 top-16 z-40 overflow-y-auto">
          <nav className="flex flex-col">
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-4 py-3 text-black hover:bg-gray-50 transition border-b">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 10a3 3 0 100-6 3 3 0 000 6zm0 1.646a4.5 4.5 0 00-4.446 3.854H5C6.1 15.951 7.967 17 10 17s3.9-1.049 4.446-2.5h-.896a4.5 4.5 0 00-4.446-3.854z" />
                </svg>
                <span className="text-sm font-medium">Chỉnh sửa thông tin</span>
              </span>
              <span className="text-gray-400">→</span>
            </Link>

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-4 py-3 text-black hover:bg-gray-50 transition border-b">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Giới thiệu</span>
              </span>
              <span className="text-gray-400">→</span>
            </Link>

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-4 py-3 text-black hover:bg-gray-50 transition border-b">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span className="text-sm font-medium">Hỗ trợ</span>
              </span>
              <span className="text-gray-400">→</span>
            </Link>

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-4 py-3 text-black hover:bg-gray-50 transition border-b">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <span className="text-sm font-medium">Điều khoản và điều kiện</span>
              </span>
              <span className="text-gray-400">→</span>
            </Link>

            <button onClick={handleLogout} className="flex items-center justify-between w-full px-4 py-3 text-red-600 hover:bg-gray-50 transition border-b font-medium text-sm">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm7.707 1.293a1 1 0 00-1.414 1.414L9.586 9l-1.293 1.293a1 1 0 101.414 1.414L11 10.414l1.293 1.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>Đăng xuất</span>
              </span>
              <span className="text-gray-400">→</span>
            </button>

            {/* App Download Section */}
            <div className="px-4 py-6 mt-4 border-t ">
              <p className="text-center text-gray-600 text-xs font-medium mb-3">Get Sun Paradise App</p>
              <div className="flex gap-2 flex-row justify-between">
                <a href="#" className="w-1/2">
                  <img src="/images/appstore.png" alt="App Store" className="w-full h-auto rounded" />
                </a>
                <a href="#" className="w-1/2">
                  <img src="/images/chplay.png" alt="Google Play" className="w-full h-auto rounded" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
