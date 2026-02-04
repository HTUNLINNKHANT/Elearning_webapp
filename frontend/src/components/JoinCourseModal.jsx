import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const JoinCourseModal = ({ isOpen, onClose, course }) => {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Helper function to get localized field
  const getLocalizedField = (item, field) => {
    if (!item) return '';
    const lang = i18n.language;
    if (lang === "my" && item[`${field}_my`]) {
      return item[`${field}_my`];
    }
    if (lang === "ja" && item[`${field}_ja`]) {
      return item[`${field}_ja`];
    }
    return item[field] || '';
  };

  

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+959 123 456 789');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-slideUp relative overflow-hidden border border-gray-700">
        {/* Dotted Pattern Background - matching site theme */}
        <div className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl overflow-hidden">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '25px 25px'
            }}
          ></div>
        </div>

        {/* Gradient orbs matching site theme */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-lime-400/10 via-cyan-400/10 to-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-yellow-400/10 rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 to-pink-500 text-black px-6 pt-6 pb-2 rounded-t-2xl relative">
          {/* Decorative circles */}
          <div className="absolute top-4 right-20 w-16 h-16 border-2 border-black/20 rounded-full"></div>
          <div className="absolute bottom-4 right-32 w-12 h-12 border-2 border-black/20 rounded-full"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">{t('joinCourse.title')}</h2>
              </div>
              <p className="text-black text-lg font-semibold break-words leading-relaxed">{getLocalizedField(course, 'title')}</p>
            </div>
            <button
              onClick={onClose}
              className="text-black hover:bg-black hover:bg-opacity-20 rounded-full p-2 transition-colors shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 relative overflow-y-auto flex-1">
          {/* Instructions */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">
                {t('joinCourse.howToJoin')}
              </h3>
            </div>
            <ol className="space-y-4 text-gray-300">
              <li className="flex items-start bg-gray-800/50 p-4 rounded-xl border-l-4 border-cyan-400">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 text-black rounded-lg flex items-center justify-center text-sm font-bold mr-4 shadow-md">
                  1
                </span>
                <span className="pt-1 text-gray-200">{t('joinCourse.step1')}</span>
              </li>
              <li className="flex items-start bg-gray-800/50 p-4 rounded-xl border-l-4 border-purple-500">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 shadow-md">
                  2
                </span>
                <span className="pt-1 text-gray-200">{t('joinCourse.step2')}</span>
              </li>
              <li className="flex items-start bg-gray-800/50 p-4 rounded-xl border-l-4 border-lime-400">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-lime-400 to-cyan-400 text-black rounded-lg flex items-center justify-center text-sm font-bold mr-4 shadow-md">
                  3
                </span>
                <span className="pt-1 text-gray-200">{t('joinCourse.step3')}</span>
              </li>
            </ol>
          </div>

          {/* Course Price */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <span className="text-white/80 text-sm font-medium block mb-1">{t('joinCourse.coursePrice')}</span>
                <span className="text-4xl font-bold text-white">{course?.price?.toLocaleString()} Ks</span>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 bg-gradient-to-b from-lime-400 to-cyan-400 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">
                {t('joinCourse.contactUs')}
              </h3>
            </div>
            
            {/* Social Media Links */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <a
                href="https://facebook.com/yourschool"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 flex flex-col items-center justify-center transition-all transform hover:scale-105 shadow-md"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="mt-2 text-sm font-semibold">Facebook</span>
              </a>
              <a
                href="https://m.me/yourschool"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg p-4 flex flex-col items-center justify-center transition-all transform hover:scale-105 shadow-md"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                </svg>
                <span className="mt-2 text-sm font-semibold">Messenger</span>
              </a>
            </div>

            {/* Phone Number */}
            <div className="bg-gray-800/50 border-2 border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-400 mb-1">{t('joinCourse.phoneNumber')}</p>
                  <p className="text-lg font-semibold text-white">
                    {showPhone ? '+959 123 456 789' : '••• ••• ••• •••'}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-lg transition-colors"
                    title={showPhone ? 'Hide phone number' : 'Show phone number'}
                  >
                    {showPhone ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={handleCopyPhone}
                    disabled={!showPhone}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showPhone 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white' 
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {copied ? t('joinCourse.copied') : t('joinCourse.copy')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2 flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('joinCourse.paymentMethods')}
            </h4>
            <p className="text-sm text-gray-300">
              {t('joinCourse.paymentInfo')}
            </p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default JoinCourseModal;
