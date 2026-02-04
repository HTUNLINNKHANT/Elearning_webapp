import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../lib/axios";
import CTASection from "../components/CTASection";
import JoinCourseModal from "../components/JoinCourseModal";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import { generateBreadcrumbSchema, generateCourseSchema } from "../utils/structuredDataHelpers";
import { formatPrice } from "../utils/currency";

// Courses page with Japanese blue and white theme
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t, i18n } = useTranslation();

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

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchCourses = async (page = 1) => {
    try {
      // Use isFiltering for subsequent filter changes, loading for initial load
      if (courses.length > 0) {
        setIsFiltering(true);
      } else {
        setLoading(true);
      }

      const params = {
        page,
        per_page: 8,
      };

      if (selectedLevel !== "all") {
        // selectedLevel now contains the category ID
        params.category_id = selectedLevel;
      }

      const { data } = await api.get("/courses", { params });

      // Small delay to allow fade-out animation
      if (isFiltering) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      // Handle paginated response
      setCourses(data.data || data);
      setCurrentPage(data.current_page || 1);
      setTotalPages(data.last_page || 1);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
      setIsFiltering(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 || selectedLevel === "all") {
      setCurrentPage(1);
      fetchCourses(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel, categories]);

  const handleJoinClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Build levels array from categories - store as objects with id and name
  const levels = [
    { id: "all", name: "all" },
    ...categories.map((cat) => ({
      id: cat.id,
      name: getLocalizedCategoryName(cat),
    })),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '25px 25px'
            }}
          ></div>
        </div>

        {/* Gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent"></div>
          <p className="mt-4 text-gray-300 font-medium">
            {t("coursesPage.loading")}
          </p>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses" }
  ];

  return (
    <>
      <SEO
        title={t("courses.title")}
        description="Explore our comprehensive Japanese language courses from N5 to N1. Expert instructors, flexible schedules, and proven JLPT preparation methods."
        keywords="Japanese courses, JLPT N5, JLPT N4, JLPT N3, JLPT N2, JLPT N1, Japanese classes, online Japanese learning"
        url="/courses"
      />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      {courses.length > 0 && courses.slice(0, 3).map(course => (
        <StructuredData key={course.id} data={generateCourseSchema(course)} />
      ))}
      
      <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dotted Pattern Background - matching home page */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '25px 25px'
          }}
        ></div>
      </div>

      {/* Vibrant gradient orbs matching home page */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/15 via-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section - ART OF LWIN Dark Theme */}
      <div className="relative bg-black text-white py-12 sm:py-14 md:py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Enrollment Badge */}
            <div className="inline-flex items-center gap-2 bg-lime-400/20 border border-lime-400/30 rounded-full px-4 py-2 text-sm font-medium text-lime-400 mb-6">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              {t("courses.badge")}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-lime-400 via-cyan-400 via-purple-500 via-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                {t("coursesPage.title")}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-4">
              {t("coursesPage.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Compact Filter Section */}
      <section className="py-6 bg-gray-900 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Simple Header */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              {t("coursesPage.filterByLevel")}
            </h2>
          </div>

          {/* Compact Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                  selectedLevel === level.id
                    ? "bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black shadow-lg"
                    : "bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-600/50 backdrop-blur-sm"
                }`}
              >
                {level.id === "all" ? t("coursesPage.allLevels") : level.name}
              </button>
            ))}
          </div>

          {/* Filter Stats */}
          <div className="mt-4 text-center">
            <div className="text-gray-400 text-sm">
              {isFiltering ? (
                <span className="inline-flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  Filtering courses...
                </span>
              ) : (
                <span>
                  Showing {courses.length} course{courses.length !== 1 ? 's' : ''} 
                  {selectedLevel !== "all" && (
                    <span className="text-cyan-400 font-medium">
                      {" "}in {levels.find(l => l.id === selectedLevel)?.name}
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid - Dark Theme */}
      <section className="py-8 sm:py-10 md:py-12 bg-black relative min-h-[400px] overflow-hidden">
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
          {loading ? (
            <div className="text-center py-12 animate-fadeIn">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
              <p className="mt-4 text-gray-300 font-medium">
                Loading courses...
              </p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 sm:py-16 md:py-20 animate-fadeIn">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-base sm:text-lg md:text-xl text-gray-300">
                {t("coursesPage.noCourses")}
              </p>
            </div>
          ) : (
            <div
              className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
                isFiltering ? "opacity-50" : "opacity-100"
              }`}
            >
              {courses.map((course, index) => {
                const apiUrl =
                  import.meta.env.VITE_API_URL || "http://localhost:8000/api";
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
                              alt={getLocalizedField(course, "title")}
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

          {/* Pagination - Dark Theme */}
          {!loading && courses.length > 0 && totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => {
                  const newPage = currentPage - 1;
                  setCurrentPage(newPage);
                  fetchCourses(newPage);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === 1
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-600/50 backdrop-blur-sm"
                }`}
              >
                ← {t("coursesPage.previous") || "Previous"}
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          fetchCourses(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          currentPage === page
                            ? "bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 text-black shadow-lg"
                            : "bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-600/50 backdrop-blur-sm"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span
                        key={page}
                        className="w-10 h-10 flex items-center justify-center text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => {
                  const newPage = currentPage + 1;
                  setCurrentPage(newPage);
                  fetchCourses(newPage);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === totalPages
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-600/50 backdrop-blur-sm"
                }`}
              >
                {t("coursesPage.next") || "Next"} →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
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

export default Courses;
