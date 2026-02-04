import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { courseService } from '../../services/courseService';
import InstructorModal from '../../components/admin/InstructorModal';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Instructors() {
  const { t } = useTranslation();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const data = await courseService.getAllInstructors();
      setInstructors(data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedInstructor(null);
    setShowModal(true);
  };

  const handleEdit = (instructor) => {
    setSelectedInstructor(instructor);
    setShowModal(true);
  };

  const handleDelete = (instructor) => {
    setSelectedInstructor(instructor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await courseService.deleteInstructor(selectedInstructor.id);
      fetchInstructors();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting instructor:', error);
      alert('Failed to delete instructor. They may have associated courses.');
    } finally {
      setIsDeleting(false);
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
        <h1 className="text-2xl font-bold">{t('admin.instructors')}</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {t('admin.addInstructor')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor) => {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
          const baseUrl = apiUrl.replace('/api', '');
          const avatarUrl = instructor.avatar ? baseUrl + instructor.avatar : null;
          
          return (
            <div key={instructor.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={instructor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center border-2 border-gray-200">
                    <span className="text-2xl text-white font-bold">
                      {instructor.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{instructor.name}</h3>
                  <p className="text-sm text-gray-500">{instructor.email}</p>
                </div>
              </div>

            {instructor.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{instructor.bio}</p>
            )}

            {instructor.expertise && (
              <p className="text-sm text-blue-600 mb-4">{instructor.expertise}</p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {instructor.courses_count || 0} {t('admin.courses')}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  instructor.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {instructor.is_active ? t('admin.active') : t('admin.inactive')}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(instructor)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                {t('admin.edit')}
              </button>
              <button
                onClick={() => handleDelete(instructor)}
                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                {t('admin.delete')}
              </button>
            </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <InstructorModal
          instructor={selectedInstructor}
          onClose={() => setShowModal(false)}
          onSave={fetchInstructors}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          title="Delete Instructor"
          itemName={selectedInstructor?.name}
          onConfirm={confirmDelete}
          onClose={() => setShowDeleteModal(false)}
          isLoading={isDeleting}
        />
      )}
    </AdminLayout>
  );
}
