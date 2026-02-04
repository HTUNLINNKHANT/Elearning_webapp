import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

const LanguageSwitcher = ({ isMobile = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
    { code: 'my', name: 'Myanmar', flag: '🇲🇲', nativeName: 'မြန်မာ' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = langCode;
  };

  // Set language attribute on mount and when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors border border-white/20 backdrop-blur-sm ${
          isMobile ? 'w-full justify-between' : ''
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentLanguage.flag}</span>
          <span className={`${isMobile ? 'inline' : 'hidden sm:inline'} text-sm font-medium text-white`}>
            {currentLanguage.nativeName}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`${
          isMobile 
            ? 'relative mt-2 w-full' 
            : 'absolute right-0 mt-2 w-48'
        } bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 py-1 z-50`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-white/10 transition-colors ${
                i18n.language === lang.code ? 'bg-gradient-to-r from-lime-400/20 to-cyan-400/20 text-lime-400' : 'text-gray-300'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{lang.nativeName}</div>
                <div className="text-xs text-gray-500">{lang.name}</div>
              </div>
              {i18n.language === lang.code && (
                <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
