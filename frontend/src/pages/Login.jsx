import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);
      // Redirect based on user role
      if (response?.user?.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/courses");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-black relative overflow-hidden">
        {/* Dotted Pattern Background - matching ART OF LWIN theme */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '25px 25px'
            }}
          ></div>
        </div>

        {/* Vibrant gradient orbs matching ART OF LWIN theme */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-orange-500/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-400/15 via-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Card with modern ART OF LWIN aesthetic */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 relative">
            {/* Decorative gradient corners */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 rounded-bl-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-tr-full blur-2xl"></div>

            <div className="p-6 sm:p-8 relative z-10">
              {/* Header with modern aesthetic */}
              <div className="text-center mb-6 sm:mb-8">
                {/* Modern icon with gradient */}
                <div className="inline-block mb-3 sm:mb-4">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-lime-400 via-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/25">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {t("auth.login.title")}
                  </span>
                </h2>

                {/* Modern Divider */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                </div>

                <p className="text-sm text-gray-300 font-light">
                  {t("auth.login.subtitle")}
                </p>
              </div>

              {error && (
                <div className="bg-red-500/20 border-l-4 border-red-500 text-red-400 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 backdrop-blur-sm">
                  <p className="text-xs sm:text-sm">{error}</p>
                </div>
              )}

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="group">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {t("auth.login.email")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-700/50 border-2 border-gray-600/50 text-white rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all placeholder-gray-400 hover:bg-gray-700/70"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {t("auth.login.password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base bg-gray-700/50 border-2 border-gray-600/50 text-white rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all placeholder-gray-400 hover:bg-gray-700/70"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 focus:outline-none transition-colors"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-700/50 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
                    />
                    <span className="ml-2 text-gray-300 group-hover:text-white transition-colors">
                      {t("auth.login.rememberMe")}
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    {t("auth.login.forgotPassword")}
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black text-sm sm:text-base font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-[1.02] relative overflow-hidden"
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("auth.login.loggingIn")}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        {t("auth.login.submit")}
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>

            {/* Bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 to-pink-500"></div>
          </div>

          {/* Bottom decorative element */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
