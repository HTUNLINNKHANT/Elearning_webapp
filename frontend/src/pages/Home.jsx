import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CTASection from "../components/CTASection";
import JoinCourseModal from "../components/JoinCourseModal";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import { generateOrganizationSchema, generateWebsiteSchema } from "../utils/structuredDataHelpers";
import { courseService } from "../services/courseService";
import { formatPrice } from "../utils/currency";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to get localized field
  const getLocalizedField = (course, field) => {
    const lang = i18n.language;
    if (lang === "my" && course[`${field}_my`]) {
      return course[`${field}_my`];
    }
    return course[field];
  };

  // Helper function to get localized category name
  const getLocalizedCategoryName = (category) => {
    if (!category) return "";
    const lang = i18n.language;
    if (lang === "my" && category.name_my) {
      return category.name_my;
    }
    return category.name;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        // Get first 4 active courses
        const activeCourses = data
          .filter((course) => course.is_active)
          .slice(0, 4);
        setCourses(activeCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleJoinClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      photo: "/images/student-1.jpg",
      reviewKey: "testimonials.reviews.sarah",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      photo: "/images/student-2.jpg",
      reviewKey: "testimonials.reviews.michael",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Williams",
      photo: "/images/student-3.jpg",
      reviewKey: "testimonials.reviews.emma",
      rating: 5,
    },
    {
      id: 4,
      name: "David Kim",
      photo: "/images/student-4.jpg",
      reviewKey: "testimonials.reviews.david",
      rating: 5,
    },
    {
      id: 5,
      name: "Lisa Anderson",
      photo: "/images/student-5.jpg",
      reviewKey: "testimonials.reviews.lisa",
      rating: 5,
    },
  ];



  const faqs = [
    {
      id: 1,
      questionKey: "faq.questions.apply.q",
      answerKey: "faq.questions.apply.a",
    },
    {
      id: 2,
      questionKey: "faq.questions.jlpt.q",
      answerKey: "faq.questions.jlpt.a",
    },
    {
      id: 3,
      questionKey: "faq.questions.prior.q",
      answerKey: "faq.questions.prior.a",
    },
    {
      id: 4,
      questionKey: "faq.questions.classes.q",
      answerKey: "faq.questions.classes.a",
    },
    {
      id: 5,
      questionKey: "faq.questions.materials.q",
      answerKey: "faq.questions.materials.a",
    },
    {
      id: 6,
      questionKey: "faq.questions.refund.q",
      answerKey: "faq.questions.refund.a",
    },
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={t("hero.title")}
        description={t("hero.description")}
        keywords="Japanese language school, JLPT, Japanese courses, learn Japanese, N5, N4, N3, N2, N1, Myanmar, online Japanese classes, 日本語, ဂျပန်ဘာသာ"
        url="/"
        type="website"
      />
      
      {/* Structured Data */}
      <StructuredData data={generateOrganizationSchema()} />
      <StructuredData data={generateWebsiteSchema()} />
      
      <div className="min-h-screen">
      {/* Hero Banner Section - ART OF LWIN Dark Theme */}
      <section
        id="home"
        className="relative bg-black text-white overflow-hidden min-h-screen flex items-center"
      >
        {/* Dotted Pattern Background - matching logo */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '25px 25px'
            }}
          ></div>
        </div>

        {/* Vibrant gradient orbs matching logo colors */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/15 via-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Enrollment Badge */}
              <div className="inline-flex items-center gap-2 bg-lime-400/20 border border-lime-400/30 rounded-full px-4 py-2 text-sm font-medium text-lime-400">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                {t("hero.badge")}
              </div>

              {/* Main Heading with ART OF LWIN logo style */}
              <div className="space-y-6">
                <div className="space-y-2">
                  {/* ART text with logo gradient */}
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none">
                    <span className="block bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 via-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                      ART
                    </span>
                  </h1>
                  
                  {/* OF LWIN text */}
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl text-white/90 font-light italic">OF</span>
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">LWIN</span>
                  </div>
                </div>
                
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg">
                  {t("hero.description")}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black font-bold py-4 px-8 rounded-full hover:shadow-2xl hover:shadow-cyan-500/25 transition-all transform hover:scale-105"
                >
                  <span>{t("hero.cta.join")}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <a
                  href="#about"
                  className="group inline-flex items-center gap-3 text-white font-semibold py-4 px-8 rounded-full border border-white/30 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:border-white/50 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Learn More</span>
                </a>
              </div>
            </div>

            {/* Right Content - Interface Mockup */}
            <div className="relative">
              {/* Yellow Lightning Badge */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-black text-2xl font-bold z-20 transform rotate-12">
                ⚡
              </div>

              {/* Main Interface Card */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-400">Live Preview</div>
                </div>

                {/* Course Preview */}
                <div className="space-y-6">
                  {/* Course Badge */}
                  <div className="inline-block bg-cyan-500/20 border border-cyan-500/30 rounded-lg px-3 py-1 text-xs font-medium text-cyan-400">
                    New
                  </div>

                  {/* Course Title */}
                  <h3 className="text-2xl font-bold text-white">
                    Digital Art Mastery
                  </h3>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">68%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      L
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Instructor Lwin</div>
                      <div className="text-xs text-gray-400">Creative Director</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all">
                      Continue Learning
                    </button>
                    <button className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl opacity-80 blur-sm"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 blur-sm"></div>
              <div className="absolute top-1/2 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg opacity-70 blur-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Dark Theme */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        {/* Gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-500/20 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t("about.badge")}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t("about.title")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master the art of visual storytelling with Lwin's signature style and industry-standard techniques.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎨",
                title: "Creative Mastery",
                description: "Learn advanced design principles and creative techniques from industry professionals.",
                color: "from-lime-400 to-cyan-500"
              },
              {
                icon: "⚡",
                title: "Fast-Track Learning",
                description: "Accelerated curriculum designed to get you creating professional work quickly.",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: "🎯",
                title: "Project-Based",
                description: "Build a stunning portfolio with real-world projects and client work.",
                color: "from-purple-400 to-pink-500"
              },
              {
                icon: "🚀",
                title: "Career Ready",
                description: "Graduate with the skills and confidence to launch your creative career.",
                color: "from-cyan-400 to-purple-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-black/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-lime-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                  3000+
                </div>
                <div className="text-gray-300">Students Enrolled</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                  95%
                </div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-gray-300">Expert Instructors</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  10+
                </div>
                <div className="text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section - Dark Theme */}
      <section
        id="courses"
        className="py-20 bg-black relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
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
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/10 via-cyan-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-yellow-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t("courses.badge")}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t("courses.title")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose from our comprehensive range of creative courses designed to transform your artistic vision into reality.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600">{t("courses.loading")}</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{t("courses.noCourses")}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => {
                const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
                const baseUrl = apiUrl.replace("/api", "");
                const imageUrl = course.image ? baseUrl + course.image : null;
                
                const gradients = [
                  {
                    bg: "from-yellow-400 via-orange-500 to-pink-500",
                    badge: "INTERMEDIATE",
                    badgeColor: "bg-orange-500/80"
                  },
                  {
                    bg: "from-blue-400 via-purple-500 to-pink-500", 
                    badge: "ADVANCED",
                    badgeColor: "bg-purple-500/80"
                  },
                  {
                    bg: "from-green-400 via-teal-500 to-blue-500",
                    badge: "BEGINNER", 
                    badgeColor: "bg-teal-500/80"
                  },
                  {
                    bg: "from-pink-400 via-red-500 to-orange-500",
                    badge: "ALL LEVELS",
                    badgeColor: "bg-red-500/80"
                  }
                ];

                const courseGradient = gradients[index % gradients.length];

                return (
                  <div key={course.id} className="group">
                    <div className="bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-800">
                      {/* Course Header with Gradient */}
                      <div className={`relative h-48 bg-gradient-to-br ${courseGradient.bg} overflow-hidden`}>
                        {imageUrl ? (
                          <div className="relative h-full">
                            <img
                              src={imageUrl}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                            {/* Light overlay for better text readability */}
                            <div className="absolute inset-0 bg-black/20"></div>
                          </div>
                        ) : (
                          <div className="relative h-full">
                            {/* Abstract gradient shapes */}
                            <div className="absolute inset-0 opacity-60">
                              <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                              <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/30 rounded-lg blur-lg"></div>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                            </div>
                          </div>
                        )}
                        
                        {/* Level Badge */}
                        <div className={`absolute top-4 left-4 ${courseGradient.badgeColor} backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-bold text-white uppercase tracking-wider`}>
                          {course.category ? getLocalizedCategoryName(course.category) : courseGradient.badge}
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-6">
                        {/* Course Title */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">
                          {getLocalizedField(course, "title")}
                        </h3>

                        {/* Course Description */}
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
                          {getLocalizedField(course, "description")}
                        </p>

                        {/* Course Stats */}
                        <div className="space-y-4 mb-6">
                          {/* Duration and Enrolled Count */}
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{course.duration_weeks} WEEKS</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                              </svg>
                              <span>{course.enrolled_count || 0} ENROLLED</span>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">
                              {formatPrice(course.price)}
                            </div>
                          </div>
                        </div>

                        {/* Join Button */}
                        <button
                          onClick={() => handleJoinClick(course)}
                          className={`w-full bg-gradient-to-r ${courseGradient.bg} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:scale-105 group-hover:shadow-xl`}
                        >
                          Join Course
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Browse All Courses Button */}
          {!loading && courses.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/courses"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">{t("courses.browseAll")}</span>
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '35px 35px'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t("testimonials.badge")}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t("testimonials.title")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from our successful students who transformed their creative careers with our programs.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => {
              const gradients = [
                "from-orange-400 to-red-500",
                "from-purple-400 to-pink-500", 
                "from-blue-400 to-cyan-500",
                "from-green-400 to-teal-500",
                "from-yellow-400 to-orange-500"
              ];

              return (
                <div key={testimonial.id} className="group">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1">
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">★</span>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-300 text-center mb-8 italic leading-relaxed">
                      "{t(testimonial.reviewKey)}"
                    </blockquote>

                    {/* Student Info */}
                    <div className="flex items-center justify-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{t("testimonials.verifiedStudent")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6 text-lg">
              {t("testimonials.joinThousands")}
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black font-bold py-4 px-8 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-105"
            >
              <span>{t("testimonials.startJourney")}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '25px 25px'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t("faq.badge")}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t("faq.title")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to the most common questions about our creative programs and learning experience.
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 hover:bg-gray-700/30 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-white pr-4 text-lg">
                    {t(faq.questionKey)}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center transition-transform ${openFaq === faq.id ? 'rotate-45' : ''}`}>
                    <span className="text-gray-300 text-xl font-light">+</span>
                  </div>
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-6 animate-slideUp">
                    <div className="pt-4 border-t border-gray-700/50">
                      <p className="text-gray-300 leading-relaxed">
                        {t(faq.answerKey)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Final CTA Section */}
      <CTASection />

      {/* Join Course Modal */}
      <JoinCourseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        course={selectedCourse}
      />
    </div>
    </>
  );
};

export default Home;
