import { useState, useEffect } from 'react';
import api from '../../lib/axios';

export default function BlogPostModal({ post, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    title_my: '',
    short_description: '',
    short_description_my: '',
    content: '',
    content_my: '',
    author: '',
    author_my: '',
    is_published: false,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('en');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        title_my: post.title_my || '',
        short_description: post.short_description || '',
        short_description_my: post.short_description_my || '',
        content: post.content || '',
        content_my: post.content_my || '',
        author: post.author || '',
        author_my: post.author_my || '',
        is_published: post.is_published || false,
      });
      if (post.thumbnail) {
        setThumbnailPreview(`${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${post.thumbnail}`);
      }
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2097152) {
        setError('Image size must be less than 2MB');
        return;
      }
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.short_description.trim()) {
      setError('Short description is required');
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }
    if (!formData.author.trim()) {
      setError('Author is required');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      if (thumbnail) {
        data.append('thumbnail', thumbnail);
      }

      if (post) {
        await api.post(`/admin/blog-posts/${post.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
          params: { _method: 'PUT' }
        });
      } else {
        await api.post('/admin/blog-posts', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      onSave();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {post ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Short Description *</label>
                  <textarea
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Content *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="10"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>
            )}

            {/* Myanmar Fields */}
            {activeTab === 'my' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title (Myanmar)</label>
                  <input
                    type="text"
                    name="title_my"
                    value={formData.title_my}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Short Description (Myanmar)</label>
                  <textarea
                    name="short_description_my"
                    value={formData.short_description_my}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Content (Myanmar)</label>
                  <textarea
                    name="content_my"
                    value={formData.content_my}
                    onChange={handleChange}
                    rows="10"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Author (Myanmar)</label>
                  <input
                    type="text"
                    name="author_my"
                    value={formData.author_my}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
            )}

            {/* Thumbnail Upload */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {thumbnailPreview && (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnail(null);
                        setThumbnailPreview('');
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Publish Status */}
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium">Publish immediately</span>
              </label>
            </div>

            {/* Action Buttons */}
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
                {loading ? 'Saving...' : post ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
