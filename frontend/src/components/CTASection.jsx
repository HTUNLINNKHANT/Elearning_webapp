import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 bg-black text-white relative overflow-hidden">
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
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/15 via-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* CTA Badge */}
          <div className="inline-flex items-center gap-2 bg-lime-400/20 border border-lime-400/30 rounded-full px-4 py-2 text-sm font-medium text-lime-400 mb-6">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
            <span>Ready to Transform</span>
          </div>
          
          {/* Main CTA Title with ART OF LWIN gradient */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 via-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">
              {t('cta.title')}
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/login"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black font-bold py-3 px-6 rounded-full hover:shadow-2xl hover:shadow-cyan-500/25 transition-all transform hover:scale-105"
            >
              <span>{t('cta.loginButton')}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link
              to="/courses"
              className="group inline-flex items-center gap-3 text-white font-semibold py-3 px-6 rounded-full border border-white/30 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:border-white/50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{t('cta.coursesButton')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
