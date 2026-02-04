import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../lib/axios';

export default function MaterialModal({ lessonId, material, onClose, onSuccess }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    title_my: '',
    description: '',
    description_my: '',
    order: 0,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (material) {
      setFormData({
        title: material.title || '',
        title_my: material.title_my || '',
        description: material.description || '',
        description_my: material.description_my || '',
        order: material.order || 0,
      });
    }
  }, [material]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (50MB max)
      if (selectedFile.size > 52428800) {
        setError('File size must be less than 50MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!material && !file) {
      setError('Please select a file');
      return;
    }

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('title_my', formData.title_my);
      data.append('description', formData.description);
      data.append('description_my', formData.description_my);
      data.append('order', formData.order);
      
      if (file) {
        data.append('file', file);
      }

      if (material) {
        await api.post(`/lessons/${lessonId}/materials/${material.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
          params: { _method: 'PUT' }
        });
      } else {
        await api.post(`/lessons/${lessonId}/materials`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save material');
      console.error('Error saving material:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full my-8 shadow-2xl transform transition-all animate-slideUp">
        <div className="p-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {material ? t('materials.editMaterial') : t('materials.addMaterial')}
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
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('materials.file')} {!material && <span className="text-red-500">*</span>}
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {material && (
                <p className="text-sm text-gray-500 mt-1">
                  Current file: {material.file_name}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">Max file size: 50MB</p>
            </div>

            {/* Title - English */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('materials.title')} (English) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Title - Myanmar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('materials.title')} (Myanmar)
              </label>
              <input
                type="text"
                name="title_my"
                value={formData.title_my}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description - English */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('materials.description')} (English)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description - Myanmar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('materials.description')} (Myanmar)
              </label>
              <textarea
                name="description_my"
                value={formData.description_my}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                {t('admin.cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? t('admin.saving') : t('admin.save')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
