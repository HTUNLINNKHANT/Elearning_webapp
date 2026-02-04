import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import { generateBreadcrumbSchema } from "../utils/structuredDataHelpers";

const About = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" }
  ];

  return (
    <>
      <SEO
        title={t("about.title")}
        description={t("about.mission.description")}
        keywords="about us, Japanese language school, JLPT preparation, expert instructors, online learning"
        url="/about"
      />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Dotted Pattern Background - matching ART OF LWIN theme */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '25px 25px'
          }}
        ></div>
      </div>

      {/* Vibrant gradient orbs matching ART OF LWIN theme */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-orange-500/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/15 via-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section with ART OF LWIN Aesthetic */}
      <div className="relative bg-black text-white py-12 sm:py-14 md:py-16 overflow-hidden">
        {/* Floating gradient elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-lg blur-md"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* ART OF LWIN Badge */}
            <div className="inline-flex items-center gap-2 bg-lime-400/20 border border-lime-400/30 rounded-full px-4 py-2 text-sm font-medium text-lime-400 mb-6">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <span>About Us</span>
            </div>
            
            {/* Main Title with ART OF LWIN gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 via-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                {t("aboutPage.title")}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light px-4 leading-relaxed">
              {t("aboutPage.subtitle")}
            </p>
          </div>
        </div>


      </div>

      {/* Founder's Profile Section - Enhanced ART OF LWIN Style */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Meet Our Founder</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {t("aboutPage.founder.title")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the visionary behind ART OF LWIN's creative revolution
            </p>
          </div>

          {/* Enhanced Founder Card */}
          <div className="relative">
            {/* Background glow effects */}
            <div className="absolute -inset-8 bg-gradient-to-r from-lime-400/10 via-cyan-400/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 via-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-50 animate-pulse"></div>
              
              {/* Content */}
              <div className="relative p-8 sm:p-12 lg:p-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  
                  {/* Left: Founder Photo & Stats */}
                  <div className="text-center lg:text-left">
                    {/* Photo Container */}
                    <div className="relative inline-block mb-8">
                      {/* Outer glow ring */}
                      <div className="absolute -inset-8 bg-gradient-to-br from-lime-400/30 via-cyan-400/30 via-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse"></div>
                      
                      {/* Photo frame */}
                      <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                        {/* Rotating gradient ring */}
                        <div className="absolute inset-0 bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 to-pink-500 rounded-full p-1 animate-spin" style={{animationDuration: '8s'}}>
                          <div className="w-full h-full bg-gray-900 rounded-full"></div>
                        </div>
                        
                        {/* Inner photo container */}
                        <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-purple-500/20"></div>
                          <img
                            src="/images/founder.jpg"
                            alt={t("aboutPage.founder.name")}
                            className="w-full h-full object-cover relative z-10"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML =
                                '<div class="w-full h-full flex items-center justify-center relative z-10"><svg class="w-32 h-32 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>';
                            }}
                          />
                        </div>
                        
                        {/* Floating badges */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12 animate-bounce" style={{animationDuration: '3s'}}>
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-xl transform -rotate-12">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Achievement Stats */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-cyan-500 bg-clip-text text-transparent mb-1">
                          10+
                        </div>
                        <div className="text-sm text-gray-400">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">
                          5000+
                        </div>
                        <div className="text-sm text-gray-400">Students Taught</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent mb-1">
                          50+
                        </div>
                        <div className="text-sm text-gray-400">Awards Won</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Founder Info & Quote */}
                  <div className="space-y-8">
                    {/* Name & Title */}
                    <div>
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                        {t("aboutPage.founder.name")}
                      </h3>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-1 bg-gradient-to-r from-lime-400 to-cyan-500"></div>
                        <p className="bg-gradient-to-r from-lime-400 to-cyan-500 bg-clip-text text-transparent font-bold text-xl tracking-wide">
                          {t("aboutPage.founder.position")}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Quote */}
                    <div className="relative">
                      {/* Quote background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-cyan-400/5 to-purple-500/5 rounded-2xl"></div>
                      
                      <div className="relative p-8 border-l-4 border-gradient-to-b from-lime-400 via-cyan-400 to-purple-500">
                        {/* Quote marks */}
                        <div className="absolute -top-2 -left-2 text-6xl text-lime-400/40 font-serif leading-none">"</div>
                        
                        <p className="text-gray-300 leading-relaxed text-lg lg:text-xl italic relative z-10 mb-4">
                          {t("aboutPage.founder.message")}
                        </p>
                        
                        <div className="absolute -bottom-2 -right-2 text-6xl text-cyan-400/40 font-serif leading-none">"</div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4">
                      <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center hover:from-blue-500/40 hover:to-blue-600/40 transition-all transform hover:scale-110">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-12 h-12 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 border border-pink-500/30 rounded-xl flex items-center justify-center hover:from-purple-500/40 hover:via-pink-500/40 hover:to-orange-500/40 transition-all transform hover:scale-110">
                        <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-600/30 rounded-xl flex items-center justify-center hover:from-blue-600/40 hover:to-blue-700/40 transition-all transform hover:scale-110">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* School Information Section - ART OF LWIN Style */}
      <div className="bg-gray-900 py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>

        {/* Gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced History Section - Timeline Style */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 px-6 py-3 rounded-full text-sm font-semibold mb-6">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Our Story</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                    {t("aboutPage.history.title")}
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  From humble beginnings to creative excellence - discover the journey that shaped ART OF LWIN
                </p>
              </div>

              {/* Single Narrative Card */}
              <div className="max-w-5xl mx-auto">
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 border border-gray-700/50 shadow-2xl">
                  {/* Gradient accent border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 via-pink-500 to-orange-500 rounded-t-3xl"></div>
                  
                  {/* Decorative icon */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-gray-900">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-6 space-y-6 text-gray-300 leading-relaxed text-base md:text-lg">
                    <p>
                      <span className="text-lime-400 font-bold">In 2016</span>, ART OF LWIN was founded with a bold vision to revolutionize creative education and make art accessible to everyone. What started as a small initiative quickly grew into a movement, driven by passion and dedication to nurturing artistic talent.
                    </p>
                    
                    <p>
                      By <span className="text-cyan-400 font-bold">2017</span>, we experienced rapid expansion as we launched our online courses and opened our doors to students from around the globe. Our innovative teaching methods and personalized approach helped us reach over 1,000 creative minds, each bringing their unique perspective to our growing community.
                    </p>
                    
                    <p>
                      The year <span className="text-purple-400 font-bold">2020</span> marked the beginning of our Innovation Era. We embraced cutting-edge digital art techniques and integrated AI-assisted creative tools into our curriculum, staying at the forefront of artistic education. This transformation allowed us to offer even more comprehensive and modern learning experiences.
                    </p>
                    
                    <p>
                      <span className="text-pink-400 font-bold">Today in 2025</span>, we stand proud as leaders in the creative education space, serving over 2,000+ students Myanmar. We continue to pioneer the future of artistic expression, combining traditional techniques with modern technology, and remain committed to our founding mission of making quality art education accessible to all who seek it.
                    </p>

                    <p className="text-white font-semibold pt-4 border-t border-gray-700/50">
                      Our journey is far from over. Every day, we work towards creating a world where creativity knows no bounds and every aspiring artist has the tools and guidance they need to succeed.
                    </p>
                  </div>
                </div>
              </div>

              {/* History Stats */}
              <div className="mt-16 bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-lime-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                      10+
                    </div>
                    <div className="text-gray-300 font-medium">Years of Excellence</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                      5000+
                    </div>
                    <div className="text-gray-300 font-medium">Students Worldwide</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                      100+
                    </div>
                    <div className="text-gray-300 font-medium">Courses Created</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
                      50+
                    </div>
                    <div className="text-gray-300 font-medium">Awards & Recognition</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission & Vision - Enhanced Design */}
            <div className="grid md:grid-cols-2 gap-8 mb-16 sm:mb-20 md:mb-24">
              {/* Mission */}
              <div className="group relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 via-cyan-500 to-blue-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"></div>
                
                <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden border border-gray-700/50 group-hover:border-lime-400/50 transition-all duration-300">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lime-400/10 to-cyan-500/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-lime-400 transition-colors">
                      {t("aboutPage.mission.title")}
                    </h3>
                    
                    {/* Divider */}
                    <div className="w-16 h-1 bg-gradient-to-r from-lime-400 to-cyan-500 mb-6 rounded-full"></div>
                    
                    {/* Content */}
                    <p className="leading-relaxed text-gray-300 text-base sm:text-lg">
                      {t("aboutPage.mission.content")}
                    </p>

                    {/* Bottom accent line */}
                    <div className="mt-6 pt-6 border-t border-gray-700/50">
                      <div className="flex items-center gap-2 text-lime-400 text-sm font-semibold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Our Commitment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="group relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"></div>
                
                <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-xl"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                      {t("aboutPage.vision.title")}
                    </h3>
                    
                    {/* Divider */}
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-6 rounded-full"></div>
                    
                    {/* Content */}
                    <p className="leading-relaxed text-gray-300 text-base sm:text-lg">
                      {t("aboutPage.vision.content")}
                    </p>

                    {/* Bottom accent line */}
                    <div className="mt-6 pt-6 border-t border-gray-700/50">
                      <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span>Our Aspiration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements - ART OF LWIN Style */}
            <div>
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-block bg-orange-500/20 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Our Achievements
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  {t("aboutPage.achievements.title")}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {t("aboutPage.achievements.items", { returnObjects: true }).map(
                  (achievement, index) => {
                    const gradients = [
                      "from-lime-400 to-cyan-500",
                      "from-purple-500 to-pink-500", 
                      "from-orange-500 to-yellow-400",
                      "from-cyan-500 to-blue-500",
                      "from-pink-500 to-red-500",
                      "from-yellow-400 to-orange-500"
                    ];
                    const gradient = gradients[index % gradients.length];

                    return (
                      <div key={index} className="group relative">
                        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center shadow-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                          {/* Top gradient accent */}
                          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}></div>

                          <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform">
                            {achievement.icon}
                          </div>
                          <h4 className="font-bold text-white text-lg sm:text-xl mb-2 sm:mb-3">
                            {achievement.title}
                          </h4>
                          <div className={`w-10 sm:w-12 h-0.5 bg-gradient-to-r ${gradient} mx-auto mb-2 sm:mb-3`}></div>
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ART OF LWIN Footer Section */}
      <div className="relative bg-black py-8 sm:py-10 md:py-12 border-t border-gray-800">
        {/* Decorative elements */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center items-center gap-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-500 opacity-50"></div>
            <div className="text-4xl">
              <span className="bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">✦</span>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
