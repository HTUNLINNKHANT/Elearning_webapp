import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { courseService } from '../../services/courseService';
import CurriculumModal from './CurriculumModal';
import LessonModal from './LessonModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import MaterialsSection from './MaterialsSection';

export default function CurriculumSection({ courseId, curriculums, onUpdate }) {
  const { t } = useTranslation();
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [expandedCurriculum, setExpandedCurriculum] = useState(null);
  const [expandedLesson, setExpandedLesson] = useState(null);

  const handleAddCurriculum = () => {
    setSelectedCurriculum(null);
    setShowCurriculumModal(true);
  };

  const handleEditCurriculum = (curriculum) => {
    setSelectedCurriculum(curriculum);
    setShowCurriculumModal(true);
  };

  const handleDeleteCurriculum = (curriculum) => {
    setSelectedCurriculum(curriculum);
    setDeleteType('curriculum');
    setShowDeleteModal(true);
  };

  const handleAddLesson = (curriculum) => {
    setSelectedCurriculum(curriculum);
    setSelectedLesson(null);
    setShowLessonModal(true);
  };

  const handleEditLesson = (curriculum, lesson) => {
    setSelectedCurriculum(curriculum);
    setSelectedLesson(lesson);
    setShowLessonModal(true);
  };

  const handleDeleteLesson = (curriculum, lesson) => {
    setSelectedCurriculum(curriculum);
    setSelectedLesson(lesson);
    setDeleteType('lesson');
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteType === 'curriculum') {
        await courseService.deleteCurriculum(courseId, selectedCurriculum.id);
      } else if (deleteType === 'lesson') {
        await courseService.deleteLesson(selectedCurriculum.id, selectedLesson.id);
      }
      onUpdate();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">📚 Course Content</h2>
            <p className="text-blue-100 text-sm">
              Organize your course into sections and lessons. Each section can contain multiple lessons.
            </p>
          </div>
          <button
            onClick={handleAddCurriculum}
            className="bg-white text-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-all shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Section
          </button>
        </div>
      </div>

      <div className="p-6">
        {curriculums.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Course Content Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start building your course by adding sections. Each section will contain lessons that students will learn.
            </p>
            <button
              onClick={handleAddCurriculum}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-semibold inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Section
            </button>
          </div>
        ) : (
        <div className="space-y-6">
          {curriculums.map((curriculum, index) => (
            <div key={curriculum.id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all">
              {/* Section Header */}
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-white transition-all"
                onClick={() =>
                  setExpandedCurriculum(
                    expandedCurriculum === curriculum.id ? null : curriculum.id
                  )
                }
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Section Number Badge */}
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-gray-800">{curriculum.title}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {curriculum.lessons?.length || 0} Lessons
                      </span>
                    </div>
                    {curriculum.description && (
                      <p className="text-sm text-gray-600 mt-1">{curriculum.description}</p>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCurriculum(curriculum);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Edit Section"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCurriculum(curriculum);
                    }}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete Section"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <div className="ml-2 text-gray-400">
                    <svg 
                      className={`w-5 h-5 transition-transform ${expandedCurriculum === curriculum.id ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Lessons List */}
              {expandedCurriculum === curriculum.id && (
                <div className="border-t-2 border-gray-200 bg-gray-50 p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h4 className="font-bold text-gray-800">Lessons in this Section</h4>
                    </div>
                    <button
                      onClick={() => handleAddLesson(curriculum)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Lesson
                    </button>
                  </div>

                  {curriculum.lessons && curriculum.lessons.length > 0 ? (
                    <div className="space-y-3">
                      {curriculum.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="bg-white rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all overflow-hidden">
                          <div
                            className="p-4 flex justify-between items-center cursor-pointer hover:bg-green-50 transition-all"
                            onClick={() =>
                              setExpandedLesson(
                                expandedLesson === lesson.id ? null : lesson.id
                              )
                            }
                          >
                            <div className="flex items-start gap-3 flex-1">
                              {/* Lesson Number */}
                              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center font-bold text-sm">
                                {lessonIndex + 1}
                              </div>
                              
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800 mb-2">{lesson.title}</div>
                                <div className="flex flex-wrap gap-2">
                                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold capitalize">
                                    📹 {lesson.type}
                                  </span>
                                  {lesson.duration_minutes && (
                                    <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                      ⏱️ {lesson.duration_minutes} min
                                    </span>
                                  )}
                                  {lesson.is_free && (
                                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                      🎁 Free Preview
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditLesson(curriculum, lesson);
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                title="Edit Lesson"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteLesson(curriculum, lesson);
                                }}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete Lesson"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                              <div className="ml-1 text-gray-400">
                                <svg 
                                  className={`w-4 h-4 transition-transform ${expandedLesson === lesson.id ? 'rotate-180' : ''}`}
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {expandedLesson === lesson.id && (
                            <div className="border-t-2 border-gray-200 p-4 bg-gray-50">
                              <div className="flex items-center gap-2 mb-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <h5 className="font-bold text-gray-800">Lesson Materials</h5>
                              </div>
                              <MaterialsSection lessonId={lesson.id} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium mb-3">No lessons in this section yet</p>
                      <button
                        onClick={() => handleAddLesson(curriculum)}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-semibold inline-flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add First Lesson
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Modals */}
      {showCurriculumModal && (
        <CurriculumModal
          courseId={courseId}
          curriculum={selectedCurriculum}
          onClose={() => setShowCurriculumModal(false)}
          onSave={onUpdate}
        />
      )}

      {showLessonModal && (
        <LessonModal
          curriculumId={selectedCurriculum.id}
          lesson={selectedLesson}
          onClose={() => setShowLessonModal(false)}
          onSave={onUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          title={
            deleteType === 'curriculum'
              ? t('admin.deleteCurriculum')
              : t('admin.deleteLesson')
          }
          message={
            deleteType === 'curriculum'
              ? t('admin.deleteCurriculumConfirm')
              : t('admin.deleteLessonConfirm')
          }
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
