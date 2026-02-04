import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BackToTop = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 group"
          aria-label="Back to top"
        >
          {/* Outer glow ring with vibrant gradient */}
          <div className="absolute -inset-2 bg-gradient-to-br from-lime-400/30 via-cyan-400/30 to-purple-500/30 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          
          {/* Main button with vibrant gradient */}
          <div className="relative bg-gradient-to-br from-lime-400 via-cyan-400 to-purple-500 hover:from-lime-500 hover:via-cyan-500 hover:to-purple-600 text-black p-3 sm:p-4 rounded-full shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 transform group-hover:scale-110 border-2 border-lime-400/50">
            {/* Dotted pattern background */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px)`,
                  backgroundSize: '8px 8px'
                }}
              ></div>
            </div>

            {/* Arrow icon */}
            <div className="relative">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-y-1 transition-transform font-bold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>

            {/* Animated corner accents */}
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-black rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>

          {/* Text hint with modern styling */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
            <span className="bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {t('backToTop')}
            </span>
            {/* Arrow pointer */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900/95"></div>
          </div>
        </button>
      )}
    </>
  );
};

export default BackToTop;
