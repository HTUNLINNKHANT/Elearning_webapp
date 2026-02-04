import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { courseService } from "../../services/courseService";

export default function CategoryModal({ category, onClose, onSave }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    name_my: "",
    description: "",
    order: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("en");

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        name_my: category.name_my || "",
        description: category.description || "",
        order: category.order || 0,
        is_active: category.is_active ?? true,
      });
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (category) {
        await courseService.updateCategory(category.id, formData);
      } else {
        await courseService.createCategory(formData);
      }
      onSave();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {category ? t("admin.editLevel") : t("admin.addLevel")}
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
                    Level Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g., Beginner (N5), Intermediate (N3-N4)"
                  />
                </div>
              </div>
            )}

            {/* Myanmar Fields */}
            {activeTab === "my" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Level Name (Myanmar)
                  </label>
                  <input
                    type="text"
                    value={formData.name_my}
                    onChange={(e) =>
                      setFormData({ ...formData, name_my: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="Myanmar level name"
                  />
                </div>
              </div>
            )}

            {/* Common Fields */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("admin.description")}
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("admin.order")}
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="mr-2"
                />
                <label htmlFor="is_active" className="text-sm font-medium">
                  {t("admin.active")}
                </label>
              </div>
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
                {loading ? "Saving..." : category ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
