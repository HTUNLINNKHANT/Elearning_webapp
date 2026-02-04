import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import api from "../lib/axios";

const MyCourses = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = useCallback(async () => {
    try {
      const { data } = await api.get("/my-enrollments");
      setEnrolledCourses(data);
    } catch (error) {
      console.error("Failed to fetch enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchEnrolledCourses();
  }, [user, navigate, fetchEnrolledCourses]);

  const getLocalizedField = (course, field) => {
    const lang = i18n.language;
    if (lang === "my" && course[`${field}_my`]) {
      return course[`${field}_my`];
    }
    if (lang === "ja" && course[`${field}_ja`]) {
      return course[`${field}_ja`];
    }
    return course[field];
  };

  const handleContinueLearning = (courseSlug) => {
    navigate(`/courses/${courseSlug}/learn`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
          </div>
          <p className="mt-4 text-gray-700 font-medium">
            {t("myCourses.loading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Japanese Seigaiha Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="seigaiha-mycourses"
              x="0"
              y="0"
              width="100"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 60 Q 25 40, 50 60 T 100 60"
                fill="none"
                stroke="#1e40af"
                strokeWidth="1"
              />
              <path
                d="M0 50 Q 25 30, 50 50 T 100 50"
                fill="none"
                stroke="#1e40af"
                strokeWidth="1"
              />
              <path
                d="M0 40 Q 25 20, 50 40 T 100 40"
                fill="none"
                stroke="#1e40af"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#seigaiha-mycourses)" />
        </svg>
      </div>

      {/* Hero Section with Japanese Aesthetic */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12 sm:py-14 md:py-16 overflow-hidden">
        {/* Decorative circles (inspired by Japanese mon) */}
        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white opacity-5 rounded-full"></div>

        {/* Wave pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100 L1200,400 L0,400 Z"
              fill="white"
              opacity="0.1"
            />
            <path
              d="M0,150 Q150,100 300,150 T600,150 T900,150 T1200,150 L1200,400 L0,400 Z"
              fill="white"
              opacity="0.1"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Japanese character accent */}
            <div className="inline-block mb-4">
              <svg
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white opacity-20"
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
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
              {t("myCourses.title")}
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-white mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto font-light px-4">
              {t("myCourses.subtitle")}
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16"
          >
            <path
              d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {enrolledCourses.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-md border-2 border-blue-100">
              <div className="mb-6">
                <div className="inline-block p-6 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full">
                  <svg
                    className="w-16 h-16 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                {t("myCourses.noCourses")}
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                {t("myCourses.noCoursesDescription")}
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-sky-700 transition-all transform hover:scale-105"
              >
                {t("myCourses.browseCourses")}
                <span>→</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((enrollment) => {
              const course = enrollment.course;
              const progress = enrollment.progress || 0;
              
              // Construct full image URL
              const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
              const baseUrl = apiUrl.replace('/api', '');
              const imageUrl = course.image ? baseUrl + course.image : null;

              return (
                <div
                  key={enrollment.id}
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-blue-100 hover:border-blue-300"
                >
                  {/* Course Image with Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={getLocalizedField(course, "title")}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = e.target.nextElementSibling;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    {/* Fallback if no image or image fails to load */}
                    {!imageUrl && (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 via-sky-50 to-blue-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="flex gap-2 justify-center mb-2">
                            <span className="text-3xl opacity-60">📚</span>
                            <span className="text-2xl opacity-80">🌊</span>
                            <span className="text-2xl opacity-70">⛩️</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Progress Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="relative">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-blue-200">
                          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                            {progress}%
                          </span>
                        </div>
                        {progress === 100 && (
                          <div className="absolute -top-1 -right-1 text-xl">
                            🎌
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar at Bottom */}
                    {progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0">
                        <div className="h-1.5 bg-white/20 backdrop-blur-sm">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {getLocalizedField(course, "title")}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                      {getLocalizedField(course, "description")}
                    </p>

                    {/* Course Stats with Japanese Style */}
                    <div className="flex items-center gap-4 mb-5 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                        <span className="font-medium">
                          {course.duration_weeks} {t("myCourses.weeks")}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-sky-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">
                          {course.total_lessons || 0} {t("myCourses.lessons")}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar with Japanese Style */}
                    <div className="mb-5">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 font-medium">
                          {t("myCourses.progress")}
                        </span>
                        <span className="font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                          {progress}%
                        </span>
                      </div>
                      <div className="relative w-full h-3 bg-gradient-to-r from-blue-100 to-sky-100 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500 rounded-full transition-all duration-500 shadow-md"
                          style={{ width: `${progress}%` }}
                        ></div>
                        {progress > 0 && (
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    {/* Action Button with Japanese Style */}
                    <button
                      onClick={() => handleContinueLearning(course.slug)}
                      className="w-full bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white font-semibold py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
                    >
                      <span>
                        {progress > 0
                          ? t("myCourses.continue")
                          : t("myCourses.start")}
                      </span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom Decoration */}
                  <div className="h-1 bg-gradient-to-r from-blue-400 via-sky-400 to-blue-400"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
