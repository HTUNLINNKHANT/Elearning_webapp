import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { courseService } from '../../services/courseService';
import CurriculumSection from '../../components/admin/CurriculumSection';
import AdminLayout from '../../components/admin/AdminLayout';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [course, setCourse] = useState(null);
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourseData = useCallback(async () => {
    try {
      setLoading(true);
      const [courseData, curriculumsData] = await Promise.all([
        courseService.getCourse(id),
        courseService.getCourseCurriculums(id),
      ]);
      setCourse(courseData);
      setCurriculums(curriculumsData);
    } catch (error) {
      console.error('Error fetching course data:', error);
      console.error('Error details:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">Loading...</div>
      </AdminLayout>
    );
  }

  if (!course) {
    return (
      <AdminLayout>
        <div>Course not found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <button
        onClick={() => navigate('/admin/courses')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← {t('admin.backToCourses')}
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex gap-4 text-sm">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {course.category?.name || 'No Level'}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                {course.instructor?.name || 'No Instructor'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{course.price?.toLocaleString()} Ks</div>
            <div className="text-sm text-gray-500 mt-1">
              {course.enrolled_count} {t('admin.students')}
            </div>
            <div className="text-sm text-gray-500">
              {curriculums.reduce((total, curr) => total + (curr.lessons?.length || 0), 0)} {t('admin.lessons')}
            </div>
          </div>
        </div>
      </div>

      <CurriculumSection
        courseId={id}
        curriculums={curriculums}
        onUpdate={fetchCourseData}
      />
    </AdminLayout>
  );
}
