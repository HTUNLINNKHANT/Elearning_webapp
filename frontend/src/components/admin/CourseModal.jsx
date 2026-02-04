import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { courseService } from "../../services/courseService";
import { Select, MenuItem, FormControl } from "@mui/material";

export default function CourseModal({
  course,
  categories,
  instructors,
  onClose,
  onSave,
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    title_my: "",
    slug: "",
    description: "",
    description_my: "",
    category_id: "",
    instructor_id: "",
    duration_weeks: "",
    price: "",
    image: "",
    is_active: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("en");

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        title_my: course.title_my || "",
        slug: course.slug || "",
        description: course.description || "",
        description_my: course.description_my || "",
        category_id: course.category_id || "",
        instructor_id: course.instructor_id || "",
        duration_weeks: course.duration_weeks || "",
        price: course.price || "",
        image: course.image || "",
        is_active: course.is_active ?? true,
      });
      // Set preview for existing image
      if (course.image) {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const baseUrl = apiUrl.replace('/api', '');
        setImagePreview(baseUrl + course.image);
      }
    }
  }, [course]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = { ...formData };
      // Always remove the image field from formData
      delete submitData.image;
      
      // Only add image if a new file was selected
      if (imageFile) {
        submitData.image = imageFile;
      }

      if (course) {
        await courseService.updateCourse(course.id, submitData);
      } else {
        await courseService.createCourse(submitData);
      }
      onSave();
      onClose();
    } catch (err) {
      console.error('Error saving course:', err);
      console.error('Error response:', err.response?.data);
      
      // Display validation errors
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || err.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {course ? t("admin.editCourse") : t("admin.addCourse")}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
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
                  onClick={() => setActiveTab("en")}
                  className={`pb-2 px-4 ${
                    activeTab === "en"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("my")}
                  className={`pb-2 px-4 ${
                    activeTab === "my"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  Myanmar
                </button>
              </div>
            </div>

            {/* English Fields */}
            {activeTab === "en" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter course description"
                  />
                </div>
              </div>
            )}

            {/* Myanmar Fields */}
            {activeTab === "my" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title (Myanmar)
                  </label>
                  <input
                    type="text"
                    value={formData.title_my}
                    onChange={(e) =>
                      setFormData({ ...formData, title_my: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="Myanmar title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description (Myanmar)
                  </label>
                  <textarea
                    rows="4"
                    value={formData.description_my}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description_my: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="Myanmar description"
                  />
                </div>
              </div>
            )}

            {/* Common Fields */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "-")
                        .replace(/-+/g, "-"),
                    })
                  }
                  className="w-full border rounded px-3 py-2 font-mono text-sm"
                  placeholder="japanese-n5-beginner-course"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty to auto-generate from title
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Course Level
                  </label>
                  <FormControl fullWidth size="small">
                    <Select
                      value={formData.category_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category_id: e.target.value,
                        })
                      }
                      displayEmpty
                    >
                      <MenuItem value="">Select Level</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Instructor
                  </label>
                  <FormControl fullWidth size="small">
                    <Select
                      value={formData.instructor_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          instructor_id: e.target.value,
                        })
                      }
                      displayEmpty
                    >
                      <MenuItem value="">Select Instructor</MenuItem>
                      {instructors.map((inst) => (
                        <MenuItem key={inst.id} value={inst.id}>
                          {inst.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration (weeks) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.duration_weeks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration_weeks: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g., 12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price (MMK) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 pr-12"
                      placeholder="200000"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">Ks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="is_active"
                className="ml-2 text-sm font-semibold text-gray-700"
              >
                {t("admin.active")}
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                disabled={loading}
              >
                {t("admin.cancel")}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("admin.saving")}
                  </span>
                ) : course ? (
                  t("admin.save")
                ) : (
                  t("admin.save")
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
