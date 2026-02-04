import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { courseService } from '../../services/courseService';
import CourseModal from '../../components/admin/CourseModal';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import AdminLayout from '../../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import api from '../../lib/axios';

export default function Courses() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesData, instructorsData] = await Promise.all([
        courseService.getAllCategories(),
        courseService.getAllInstructors(),
      ]);
      
      // Fetch courses with pagination
      const { data: coursesData } = await api.get('/courses', {
        params: {
          paginate: true,
          per_page: 10,
          page: pagination?.current_page || 1,
          search: searchTerm
        }
      });
      
      setCourses(coursesData.data);
      setPagination({
        current_page: coursesData.current_page,
        last_page: coursesData.last_page,
        total: coursesData.total,
        from: coursesData.from,
        to: coursesData.to,
      });
      setCategories(categoriesData);
      setInstructors(instructorsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination?.current_page, searchTerm]);

  const handlePageChange = (page) => {
    setPagination({ ...pagination, current_page: page });
  };

  const handleAdd = () => {
    setSelectedCourse(null);
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleDelete = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await courseService.deleteCourse(selectedCourse.id);
      fetchData();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };



  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('admin.courses')}</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {t('admin.addCourse')}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder={t('admin.searchCourses')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t('admin.title')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t('admin.instructor')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t('admin.price')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t('admin.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t('admin.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => {
              const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
              const baseUrl = apiUrl.replace('/api', '');
              const imageUrl = course.image ? baseUrl + course.image : null;
              
              return (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/admin/courses/${course.slug || course.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {course.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.category?.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.instructor?.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.price?.toLocaleString()} Ks</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        course.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {course.is_active ? t('admin.active') : t('admin.inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      {t('admin.edit')}
                    </button>
                    <button
                      onClick={() => handleDelete(course)}
                      className="text-red-600 hover:text-red-900"
                    >
                      {t('admin.delete')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {pagination.from}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900">
                {pagination.to}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {pagination.total}
              </span>{" "}
              courses
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex gap-1">
                {[...Array(pagination.last_page)].map((_, index) => {
                  const page = index + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === pagination.last_page ||
                    (page >= pagination.current_page - 1 &&
                      page <= pagination.current_page + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          page === pagination.current_page
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === pagination.current_page - 2 ||
                    page === pagination.current_page + 2
                  ) {
                    return (
                      <span
                        key={page}
                        className="px-2 py-2 text-gray-500"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <CourseModal
          course={selectedCourse}
          categories={categories}
          instructors={instructors}
          onClose={() => setShowModal(false)}
          onSave={fetchData}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          title={t('admin.deleteCourse')}
          message={t('admin.deleteCourseConfirm')}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </AdminLayout>
  );
}
