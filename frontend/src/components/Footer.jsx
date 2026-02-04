import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Dotted Pattern Background - matching theme */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>

      {/* Gradient orbs matching theme */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-lime-400/10 via-cyan-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/images/logo/logo.png" 
                alt="Leadership Japanese Language School" 
                className="h-16 w-auto object-contain rounded-lg border border-lime-400/20 shadow-lg shadow-lime-400/10"
              />
              {/* <div>
                <span className="text-lg font-bold block bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Leadership
                </span>
                <span className="text-xs text-gray-300">Japanese Language School</span>
              </div> */}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-lime-400">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-lime-400 transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('footer.courses')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-purple-400 transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-pink-400 transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">{t('footer.ourCourses')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm hover:text-lime-400 transition-colors cursor-pointer">{t('footer.levels.n5')}</li>
              <li className="text-gray-300 text-sm hover:text-cyan-400 transition-colors cursor-pointer">{t('footer.levels.n4')}</li>
              <li className="text-gray-300 text-sm hover:text-purple-400 transition-colors cursor-pointer">{t('footer.levels.n3')}</li>
              <li className="text-gray-300 text-sm hover:text-pink-400 transition-colors cursor-pointer">{t('footer.levels.n2')}</li>
              <li className="text-gray-300 text-sm hover:text-orange-400 transition-colors cursor-pointer">{t('footer.levels.n1')}</li>
              <li className="text-gray-300 text-sm hover:text-yellow-400 transition-colors cursor-pointer">{t('footer.levels.business')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-purple-400">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm group">
                <span className="mr-2 text-lime-400">🏫</span>
                <span className="text-gray-300 group-hover:text-lime-400 transition-colors">{t('footer.address')}</span>
              </li>
              <li className="flex items-start text-sm group">
                <span className="mr-2 text-cyan-400">📱</span>
                <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">{t('footer.phone')}</span>
              </li>
              <li className="flex items-start text-sm group">
                <span className="mr-2 text-purple-400">📩</span>
                <span className="text-gray-300 group-hover:text-purple-400 transition-colors">{t('footer.email')}</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-pink-400">{t('footer.followUs')}</h4>
              <div className="flex space-x-3">
                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center hover:from-blue-500/40 hover:to-blue-600/40 hover:border-blue-400/50 transition-all transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Twitter/X */}
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-gray-600/30 rounded-full flex items-center justify-center hover:from-gray-600/40 hover:to-gray-700/40 hover:border-gray-500/50 transition-all transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 border border-pink-500/30 rounded-full flex items-center justify-center hover:from-purple-500/40 hover:via-pink-500/40 hover:to-orange-500/40 hover:border-pink-400/50 transition-all transform hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full flex items-center justify-center hover:from-red-500/40 hover:to-red-600/40 hover:border-red-400/50 transition-all transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-600/30 rounded-full flex items-center justify-center hover:from-blue-600/40 hover:to-blue-700/40 hover:border-blue-500/50 transition-all transform hover:scale-110 hover:shadow-lg hover:shadow-blue-600/25"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gradient-to-r from-lime-400/20 via-cyan-400/20 to-purple-500/20 mt-8 pt-8 text-center relative">
          {/* Gradient border effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-lime-400/30 via-cyan-400/30 via-purple-500/30 via-pink-500/30 to-orange-500/30"></div>
          
          <p className="text-gray-300 text-sm">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="mt-2 space-x-4">
            <a href="#" className="text-gray-300 hover:text-lime-400 text-xs transition-colors">
              {t('footer.privacyPolicy')}
            </a>
            <span className="text-gray-500">|</span>
            <a href="#" className="text-gray-300 hover:text-cyan-400 text-xs transition-colors">
              {t('footer.termsOfService')}
            </a>
            <span className="text-gray-500">|</span>
            <a href="#" className="text-gray-300 hover:text-purple-400 text-xs transition-colors">
              {t('footer.cookiePolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
