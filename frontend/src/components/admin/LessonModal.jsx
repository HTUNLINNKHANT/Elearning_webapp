import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { courseService } from "../../services/courseService";
import { Select, MenuItem, FormControl } from "@mui/material";

export default function LessonModal({ curriculumId, lesson, onClose, onSave }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    title_my: "",
    title_ja: "",
    content: "",
    content_my: "",
    content_ja: "",
    type: "video", // Currently only video lessons are supported
    video_url: "",
    duration_minutes: "",
    order: 0,
    is_free: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("en");

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title || "",
        title_my: lesson.title_my || "",
        title_ja: lesson.title_ja || "",
        content: lesson.content || "",
        content_my: lesson.content_my || "",
        content_ja: lesson.content_ja || "",
        type: lesson.type || "video",
        video_url: lesson.video_url || "",
        duration_minutes: lesson.duration_minutes || "",
        order: lesson.order || 0,
        is_free: lesson.is_free || false,
      });
    }
  }, [lesson]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (lesson) {
        await courseService.updateLesson(curriculumId, lesson.id, formData);
      } else {
        await courseService.createLesson(curriculumId, formData);
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
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {lesson ? t("admin.editLesson") : t("admin.addLesson")}
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
                <button
                  type="button"
                  onClick={() => setActiveTab("ja")}
                  className={`pb-2 px-4 ${
                    activeTab === "ja"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  Japanese
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
                    placeholder="Enter lesson title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <textarea
                    rows="4"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter lesson content"
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
                    Content (Myanmar)
                  </label>
                  <textarea
                    rows="4"
                    value={formData.content_my}
                    onChange={(e) =>
                      setFormData({ ...formData, content_my: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="Myanmar content"
                  />
                </div>
              </div>
            )}

            {/* Japanese Fields */}
            {activeTab === "ja" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title (Japanese)
                  </label>
                  <input
                    type="text"
                    value={formData.title_ja}
                    onChange={(e) =>
                      setFormData({ ...formData, title_ja: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="Japanese title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Content (Japanese)
                  </label>
                  <textarea
                    rows="4"
                    value={formData.content_ja}
                    onChange={(e) =>
                      setFormData({ ...formData, content_ja: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="Japanese content"
                  />
                </div>
              </div>
            )}

            {/* Common Fields */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type *</label>
                <FormControl fullWidth size="small" required>
                  <Select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <MenuItem value="video">Video</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Vimeo Video URL or Embed Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.video_url}
                  onChange={(e) =>
                    setFormData({ ...formData, video_url: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://vimeo.com/123456789 or paste Vimeo embed code"
                />
                <p className="mt-1 text-xs text-gray-500">
                  💡 Supports: Vimeo URL, Video ID, or full embed iframe code
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration_minutes: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g., 30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Order
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
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_free"
                    checked={formData.is_free}
                    onChange={(e) =>
                      setFormData({ ...formData, is_free: e.target.checked })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">Free Preview</span>
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
                {loading ? "Saving..." : lesson ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
