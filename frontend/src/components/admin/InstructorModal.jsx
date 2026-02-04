import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { courseService } from '../../services/courseService';

export default function InstructorModal({ instructor, onClose, onSave }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    name_my: '',
    email: '',
    bio: '',
    bio_my: '',
    avatar: '',
    expertise: '',
    is_active: true,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('en');

  useEffect(() => {
    if (instructor) {
      setFormData({
        name: instructor.name || '',
        name_my: instructor.name_my || '',
        email: instructor.email || '',
        bio: instructor.bio || '',
        bio_my: instructor.bio_my || '',
        avatar: instructor.avatar || '',
        expertise: instructor.expertise || '',
        is_active: instructor.is_active ?? true,
      });
      // Set preview for existing avatar
      if (instructor.avatar) {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const baseUrl = apiUrl.replace('/api', '');
        setAvatarPreview(baseUrl + instructor.avatar);
      }
    }
  }, [instructor]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = { ...formData };
      delete submitData.avatar;
      
      if (avatarFile) {
        submitData.avatar = avatarFile;
      }

      if (instructor) {
        await courseService.updateInstructor(instructor.id, submitData);
      } else {
        await courseService.createInstructor(submitData);
      }
      onSave();
      onClose();
    } catch (err) {
      console.error('Error saving instructor:', err);
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {instructor ? t('admin.editInstructor') : t('admin.addInstructor')}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Language Tabs */}
            <div className="mb-4 border-b">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('en')}
                  className={`pb-2 px-4 ${activeTab === 'en' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('my')}
                  className={`pb-2 px-4 ${activeTab === 'my' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                >
                  Myanmar
                </button>
              </div>
            </div>

            {/* English Fields */}
            {activeTab === 'en' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter instructor name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter bio"
                  />
                </div>
              </div>
            )}

            {/* Myanmar Fields */}
            {activeTab === 'my' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name (Myanmar)</label>
                  <input
                    type="text"
                    value={formData.name_my}
                    onChange={(e) => setFormData({ ...formData, name_my: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Myanmar name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio (Myanmar)</label>
                  <textarea
                    rows="4"
                    value={formData.bio_my}
                    onChange={(e) => setFormData({ ...formData, bio_my: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Myanmar bio"
                  />
                </div>
              </div>
            )}

            {/* Common Fields */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Expertise</label>
                <input
                  type="text"
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g., Web Development, Data Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Avatar Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="w-full border rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {avatarPreview && (
                  <div className="mt-3">
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-full border-2 border-gray-200"
                    />
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Supported formats: JPEG, PNG, GIF, WebP (Max 2MB)
                </p>
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm font-medium">Active</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : instructor ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
