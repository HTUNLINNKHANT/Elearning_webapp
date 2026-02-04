import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Check if current path is learning page (should highlight My Courses)
  const isLearningPage = location.pathname.includes("/courses/") && location.pathname.includes("/learn");
  
  // Check if Myanmar language is active
  const isMyanmarLanguage = i18n.language === 'my';

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/images/logo/logo.png" 
              alt="Leadership Japanese Language School" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
            {/* <div>
              <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent block">
                ART OF LWIN
              </span>
              <span className="text-xs sm:text-sm text-gray-400 hidden sm:block">Creative Academy</span>
            </div> */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `text-lime-400 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} font-semibold border-b-2 border-lime-400 pb-1`
                  : `text-gray-300 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} hover:text-lime-400 transition-colors font-medium`
              }
            >
              {t("nav.home")}
            </NavLink>
            <NavLink
              to="/courses"
              end
              className={({ isActive }) =>
                isActive
                  ? `text-lime-400 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} font-semibold border-b-2 border-lime-400 pb-1`
                  : `text-gray-300 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} hover:text-lime-400 transition-colors font-medium`
              }
            >
              {t("nav.courses")}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `text-lime-400 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} font-semibold border-b-2 border-lime-400 pb-1`
                  : `text-gray-300 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} hover:text-lime-400 transition-colors font-medium`
              }
            >
              {t("nav.about")}
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? `text-lime-400 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} font-semibold border-b-2 border-lime-400 pb-1`
                  : `text-gray-300 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} hover:text-lime-400 transition-colors font-medium`
              }
            >
              {t("nav.blogs")}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? `text-lime-400 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} font-semibold border-b-2 border-lime-400 pb-1`
                  : `text-gray-300 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} hover:text-lime-400 transition-colors font-medium`
              }
            >
              {t("nav.contact")}
            </NavLink>

            {user && (
              <NavLink
                to="/my-courses"
                className={({ isActive }) =>
                  isActive || isLearningPage
                    ? `text-lime-400 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} font-semibold border-b-2 border-lime-400 pb-1`
                    : `text-gray-300 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} hover:text-lime-400 transition-colors font-medium`
                }
              >
                {t("nav.myCourses")}
              </NavLink>
            )}

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? `text-lime-400 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} font-semibold border-b-2 border-lime-400 pb-1`
                    : `text-gray-300 ${isMyanmarLanguage ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} hover:text-lime-400 transition-colors font-medium`
                }
              >
                {t("nav.admin")}
              </NavLink>
            )}

            <div className="pl-3 lg:pl-4 border-l border-gray-600">
              <LanguageSwitcher />
            </div>

            {/* Login/Profile Button */}
            {!user ? (
              <Link
                to="/login"
                className="ml-3 lg:ml-4 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black text-sm lg:text-base font-bold px-4 lg:px-6 py-2 lg:py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                {t("nav.login")}
              </Link>
            ) : (
              <div className="ml-3 lg:ml-4 relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 hover:opacity-80 transition-all duration-200"
                >
                  {user.avatar ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}${user.avatar}`}
                      alt={user.name}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-blue-200 shadow-md transition-transform hover:scale-105"
                    />
                  ) : (
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base border-2 border-blue-200 shadow-md transition-transform hover:scale-105">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10 animate-fadeIn" 
                      onClick={() => setUserMenuOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20 animate-slideDown origin-top">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Link>

                      {user.role === 'student' && (
                        <Link
                          to="/my-courses"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {t("nav.myCourses")}
                        </Link>
                      )}

                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {t("nav.admin")}
                        </Link>
                      )}

                      <div className="border-t border-gray-200 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t("nav.logout")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 sm:py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-2 sm:space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-lime-400 text-sm sm:text-base font-semibold bg-lime-400/10 px-3 sm:px-4 py-2 rounded-lg"
                    : "text-gray-300 text-sm sm:text-base hover:text-lime-400 hover:bg-white/5 transition-colors font-medium px-3 sm:px-4 py-2 rounded-lg"
                }
              >
                {t("nav.home")}
              </NavLink>
              <NavLink
                to="/courses"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-lime-400 text-sm sm:text-base font-semibold bg-lime-400/10 px-3 sm:px-4 py-2 rounded-lg"
                    : "text-gray-300 text-sm sm:text-base hover:text-lime-400 hover:bg-white/5 transition-colors font-medium px-3 sm:px-4 py-2 rounded-lg"
                }
              >
                {t("nav.courses")}
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-lime-400 text-sm sm:text-base font-semibold bg-lime-400/10 px-3 sm:px-4 py-2 rounded-lg"
                    : "text-gray-300 text-sm sm:text-base hover:text-lime-400 hover:bg-white/5 transition-colors font-medium px-3 sm:px-4 py-2 rounded-lg"
                }
              >
                {t("nav.about")}
              </NavLink>
              <NavLink
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-lime-400 text-sm sm:text-base font-semibold bg-lime-400/10 px-3 sm:px-4 py-2 rounded-lg"
                    : "text-gray-300 text-sm sm:text-base hover:text-lime-400 hover:bg-white/5 transition-colors font-medium px-3 sm:px-4 py-2 rounded-lg"
                }
              >
                {t("nav.blogs")}
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-lime-400 text-sm sm:text-base font-semibold bg-lime-400/10 px-3 sm:px-4 py-2 rounded-lg"
                    : "text-gray-300 text-sm sm:text-base hover:text-lime-400 hover:bg-white/5 transition-colors font-medium px-3 sm:px-4 py-2 rounded-lg"
                }
              >
                {t("nav.contact")}
              </NavLink>

              {user && (
                <NavLink
                  to="/my-courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive || isLearningPage
                      ? "text-lime-400 text-sm sm:text-base font-semibold bg-lime-400/10 px-3 sm:px-4 py-2 rounded-lg"
                      : "text-gray-300 text-sm sm:text-base hover:text-lime-400 hover:bg-white/5 transition-colors font-medium px-3 sm:px-4 py-2 rounded-lg"
                  }
                >
                  {t("nav.myCourses")}
                </NavLink>
              )}

              {user?.role === "admin" && (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-lime-400 text-sm sm:text-base font-semibold bg-lime-400/10 px-3 sm:px-4 py-2 rounded-lg"
                      : "text-gray-300 text-sm sm:text-base hover:text-lime-400 hover:bg-white/5 transition-colors font-medium px-3 sm:px-4 py-2 rounded-lg"
                  }
                >
                  {t("nav.admin")}
                </NavLink>
              )}

              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <LanguageSwitcher isMobile={true} />
              </div>

              {/* Mobile Login/Profile Button */}
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black text-sm sm:text-base font-bold px-4 py-3 rounded-lg transition-all shadow-lg hover:shadow-cyan-500/25 mt-2"
                >
                  {t("nav.login")}
                </Link>
              ) : (
                <div className="flex items-center gap-3 px-3 sm:px-4 py-3 bg-lime-400/10 rounded-lg mt-2">
                  {user.avatar ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}${user.avatar}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold border-2 border-blue-200">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <p className="text-gray-900 font-semibold text-sm sm:text-base">
                      {user.name}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
