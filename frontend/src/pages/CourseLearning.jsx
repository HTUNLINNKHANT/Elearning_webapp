import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { useSecureVideo } from "../hooks/useSecureVideo";
import api from "../lib/axios";
import LessonMaterials from "../components/LessonMaterials";

const CourseLearning = () => {
  const { courseId: courseSlug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completingLesson, setCompletingLesson] = useState(false);

  // Secure video hook - fetches time-limited secure URL
  const { videoData, loading: videoLoading, error: videoError } = useSecureVideo(selectedLesson?.id);

  const fetchCourseDetails = async () => {
    try {
      const { data } = await api.get(`/enrolled/courses/${courseSlug}`);
      setCourse(data);

      // Auto-select first lesson
      if (data.curriculums && data.curriculums.length > 0) {
        const firstCurriculum = data.curriculums[0];
        if (firstCurriculum.lessons && firstCurriculum.lessons.length > 0) {
          setSelectedLesson(firstCurriculum.lessons[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
      if (error.response?.status === 403) {
        alert("You are not enrolled in this course");
        navigate("/my-courses");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCourseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug, user]);

  const getLocalizedField = (item, field) => {
    const lang = i18n.language;
    if (lang === "my" && item[`${field}_my`]) {
      return item[`${field}_my`];
    }
    if (lang === "ja" && item[`${field}_ja`]) {
      return item[`${field}_ja`];
    }
    return item[field];
  };



  const toggleLessonComplete = async (e, lessonId, isCompleted) => {
    e.stopPropagation(); // Prevent lesson selection when clicking checkbox
    setCompletingLesson(true);
    try {
      const endpoint = isCompleted ? 'incomplete' : 'complete';
      await api.post(`/lessons/${lessonId}/${endpoint}`);
      
      // Update the course data with new completion status
      setCourse(prevCourse => {
        const updatedCourse = { ...prevCourse };
        updatedCourse.curriculums = updatedCourse.curriculums.map(curriculum => ({
          ...curriculum,
          lessons: curriculum.lessons.map(lesson => 
            lesson.id === lessonId 
              ? { ...lesson, is_completed: !isCompleted }
              : lesson
          )
        }));
        return updatedCourse;
      });

      // Update selected lesson if it's the one being toggled
      if (selectedLesson?.id === lessonId) {
        setSelectedLesson(prev => ({ ...prev, is_completed: !isCompleted }));
      }

      // Refresh course data to get updated progress
      fetchCourseDetails();
    } catch (error) {
      console.error('Failed to update lesson progress:', error);
      alert('Failed to update progress. Please try again.');
    } finally {
      setCompletingLesson(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-700 font-medium">{t('courseLearning.loading')}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center text-gray-900">
          <p className="text-xl">{t('courseLearning.courseNotFound')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white lg:bg-gradient-to-b lg:from-blue-50 lg:to-white">
      <div className="container mx-auto lg:px-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-6">
          {/* Main Content - Video Player */}
          <div className="flex-1 flex flex-col">
            {/* Course Header - Simplified for Mobile */}
            <div className="bg-white lg:rounded-t-xl border-b lg:border-2 border-gray-200 lg:border-blue-100 px-2 lg:px-6 py-1.5 lg:py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-1.5 lg:gap-4 min-w-0 flex-1">
                <button
                  onClick={() => navigate("/my-courses")}
                  className="text-gray-700 lg:text-blue-600 hover:text-gray-900 lg:hover:text-blue-700 transition-colors shrink-0 p-0.5 lg:p-1"
                  aria-label="Back to courses"
                >
                  <svg
                    className="w-4 h-4 lg:w-6 lg:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-gray-900 font-medium text-xs lg:text-lg truncate leading-tight">
                    {selectedLesson ? getLocalizedField(selectedLesson, 'title') : getLocalizedField(course, "title")}
                  </h1>
                  <p className="text-gray-500 text-[10px] lg:hidden leading-tight">
                    {(() => {
                      const totalLessons = course.curriculums?.reduce((acc, curr) => acc + (curr.lessons?.length || 0), 0) || 0;
                      const completedLessons = course.curriculums?.reduce((acc, curr) => 
                        acc + (curr.lessons?.filter(l => l.is_completed).length || 0), 0) || 0;
                      return `${completedLessons}/${totalLessons} completed`;
                    })()}
                  </p>
                </div>
              </div>


            </div>

            {/* Video Player */}
            <div
              className="bg-gradient-to-br from-gray-900 to-gray-800 lg:border-x-2 border-blue-100 flex items-center justify-center"
              style={{ aspectRatio: "16/9" }}
            >
              {selectedLesson && selectedLesson.video_url ? (
                <div className="w-full h-full">
                  {videoLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-300">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-transparent mb-4"></div>
                        <p>{t('courseLearning.loadingVideo')}</p>
                      </div>
                    </div>
                  ) : videoError ? (
                    <div className="text-center text-red-400 p-8">
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-lg font-semibold mb-2">{t('courseLearning.videoAccessDenied')}</p>
                      <p className="text-sm opacity-75">{videoError}</p>
                    </div>
                  ) : videoData?.embed_url ? (
                    <iframe
                      key={videoData.embed_url} // Force re-render when URL changes
                      src={videoData.embed_url}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      title={getLocalizedField(selectedLesson, 'title')}
                    ></iframe>
                  ) : (
                    <div className="text-center text-red-400">
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-lg">{t('courseLearning.invalidVideo')}</p>
                      <p className="text-sm mt-2 opacity-75">
                        {t('courseLearning.invalidVideoDescription')}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-300">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 opacity-50"
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
                  <p className="text-lg">{t('courseLearning.selectLessonPrompt')}</p>
                </div>
              )}
            </div>

            {/* Lesson Info */}
            {selectedLesson && (
              <div className="bg-white lg:rounded-b-xl border-t lg:border-2 lg:border-t-0 border-gray-200 lg:border-blue-100 p-2 lg:p-6 shadow-sm">
                <h2 className="text-gray-900 font-semibold text-sm lg:text-xl mb-1.5 lg:mb-3">
                  {getLocalizedField(selectedLesson, 'title')}
                </h2>
                {getLocalizedField(selectedLesson, 'content') && (
                  <p className="text-gray-600 text-xs lg:text-sm leading-snug lg:leading-relaxed mb-2 lg:mb-4">
                    {getLocalizedField(selectedLesson, 'content')}
                  </p>
                )}

                {/* Lesson Materials */}
                <LessonMaterials lessonId={selectedLesson.id} />
              </div>
            )}

            {/* Mobile Lessons List - Simple Vertical Layout (No Sidebar) */}
            <div className="lg:hidden bg-white">
              {/* Progress Bar for Mobile */}
              <div className="border-t border-gray-200 p-2">
                {(() => {
                  const totalLessons = course.curriculums?.reduce((acc, curr) => acc + (curr.lessons?.length || 0), 0) || 0;
                  const completedLessons = course.curriculums?.reduce((acc, curr) => 
                    acc + (curr.lessons?.filter(l => l.is_completed).length || 0), 0) || 0;
                  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
                  
                  return (
                    <div className="mb-2">
                      <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                        <span className="font-medium">Course Progress</span>
                        <span className="font-semibold text-blue-600">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {completedLessons} of {totalLessons} lessons completed
                      </p>
                    </div>
                  );
                })()}

                <h3 className="text-gray-900 font-semibold text-sm mb-2">All Lessons</h3>
              </div>

              {/* Lessons List */}
              <div className="divide-y divide-gray-100">
                {course.curriculums && course.curriculums.length > 0 ? (
                  course.curriculums.map((curriculum, currIndex) => (
                    <div key={curriculum.id}>
                      {/* Curriculum Header */}
                      <div className="bg-gray-50 px-2 py-1.5">
                        <h4 className="text-gray-700 font-medium text-xs">
                          Section {currIndex + 1}: {getLocalizedField(curriculum, 'title')}
                        </h4>
                      </div>

                      {/* Lessons */}
                      {curriculum.lessons && curriculum.lessons.length > 0 ? (
                        curriculum.lessons.map((lesson, lessonIndex) => (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setSelectedLesson(lesson);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-full text-left px-2 py-2 hover:bg-blue-50 active:bg-blue-100 transition-colors ${
                              selectedLesson?.id === lesson.id ? "bg-blue-50" : "bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {/* Lesson Number/Icon */}
                              <div
                                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                                  selectedLesson?.id === lesson.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {lesson.video_url ? (
                                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                ) : (
                                  <span className="text-[10px] font-semibold">{lessonIndex + 1}</span>
                                )}
                              </div>

                              {/* Lesson Info */}
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-medium ${
                                  selectedLesson?.id === lesson.id ? "text-blue-600" : "text-gray-900"
                                }`}>
                                  {getLocalizedField(lesson, 'title')}
                                </p>
                                {lesson.duration_minutes && (
                                  <p className="text-[10px] text-gray-500 mt-0.5">
                                    {lesson.duration_minutes} min
                                  </p>
                                )}
                              </div>

                              {/* Completion Checkbox */}
                              <div
                                onClick={(e) => toggleLessonComplete(e, lesson.id, lesson.is_completed)}
                                className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  lesson.is_completed
                                    ? 'bg-green-500 border-green-500'
                                    : 'border-gray-300'
                                } ${completingLesson ? 'opacity-50' : ''}`}
                              >
                                {lesson.is_completed && (
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="px-2 py-2 text-gray-500 text-xs">No lessons available</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-2 py-4 text-center text-gray-500">
                    <p className="text-xs">No curriculum available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Curriculum (Desktop Only) */}
          <div className="hidden lg:flex lg:w-96 bg-white lg:rounded-xl lg:border-2 border-blue-100 flex-col overflow-hidden shadow-xl">
            <div className="p-6 border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-white">
              <h2 className="text-gray-900 font-bold text-lg mb-4">
                {t('courseLearning.courseContent')}
              </h2>
              {/* Progress Bar */}
              {(() => {
                const totalLessons = course.curriculums?.reduce((acc, curr) => acc + (curr.lessons?.length || 0), 0) || 0;
                const completedLessons = course.curriculums?.reduce((acc, curr) => 
                  acc + (curr.lessons?.filter(l => l.is_completed).length || 0), 0) || 0;
                const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
                
                return (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{t('myCourses.progress')}</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {completedLessons} / {totalLessons} {t('myCourses.lessons')}
                    </p>
                  </div>
                );
              })()}
            </div>

            <div className="flex-1 overflow-y-auto">
              {course.curriculums && course.curriculums.length > 0 ? (
                course.curriculums.map((curriculum, currIndex) => (
                  <div key={curriculum.id} className="border-b border-blue-100">
                    <div className="p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-white">
                      <h3 className="text-gray-900 font-semibold text-xs lg:text-sm">
                        {t('courseLearning.section')} {currIndex + 1}: {getLocalizedField(curriculum, 'title')}
                      </h3>
                      {getLocalizedField(curriculum, 'description') && (
                        <p className="text-gray-600 text-xs mt-1">
                          {getLocalizedField(curriculum, 'description')}
                        </p>
                      )}
                    </div>

                    {curriculum.lessons && curriculum.lessons.length > 0 ? (
                      <div>
                        {curriculum.lessons.map((lesson, lessonIndex) => (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson)}
                            className={`w-full text-left p-3 lg:p-4 hover:bg-blue-50 active:bg-blue-100 transition-colors border-l-4 ${
                              selectedLesson?.id === lesson.id
                                ? "bg-blue-50 border-blue-600"
                                : "border-transparent"
                            }`}
                          >
                            <div className="flex items-start gap-2 lg:gap-3">
                              <div
                                className={`shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${
                                  selectedLesson?.id === lesson.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {lesson.video_url ? (
                                  <svg
                                    className="w-3 h-3 lg:w-4 lg:h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                ) : (
                                  <span className="text-xs font-semibold">
                                    {lessonIndex + 1}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-xs lg:text-sm font-medium leading-tight ${
                                    selectedLesson?.id === lesson.id
                                      ? "text-blue-600"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {getLocalizedField(lesson, 'title')}
                                </p>
                                {lesson.duration_minutes && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {lesson.duration_minutes} {t('courseLearning.minutes')}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-1 lg:gap-2 shrink-0">
                                {lesson.is_free && (
                                  <span className="text-xs bg-green-600 text-white px-1.5 lg:px-2 py-0.5 lg:py-1 rounded">
                                    {t('courseLearning.free')}
                                  </span>
                                )}
                                <div
                                  onClick={(e) => toggleLessonComplete(e, lesson.id, lesson.is_completed)}
                                  role="checkbox"
                                  aria-checked={lesson.is_completed}
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      toggleLessonComplete(e, lesson.id, lesson.is_completed);
                                    }
                                  }}
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors touch-manipulation ${
                                    lesson.is_completed
                                      ? 'bg-green-600 border-green-600'
                                      : 'border-gray-300 hover:border-green-600'
                                  } ${completingLesson ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                  {lesson.is_completed && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 lg:p-4 text-gray-600 text-xs lg:text-sm">
                        {t('courseLearning.noLessons')}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 lg:p-6 text-center text-gray-600">
                  <p className="text-sm">{t('courseLearning.noCurriculum')}</p>
                </div>
              )}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
