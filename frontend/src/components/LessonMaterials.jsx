import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import api from "../lib/axios";

export default function LessonMaterials({ lessonId }) {
  const { t, i18n } = useTranslation();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState(null);

  const fetchMaterials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/lessons/${lessonId}/materials`);
      setMaterials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setError("Failed to load materials");
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) {
      fetchMaterials();
    }
  }, [lessonId, fetchMaterials]);

  const getLocalizedField = (material, field) => {
    const lang = i18n.language;
    if (lang === "my" && material[`${field}_my`]) {
      return material[`${field}_my`];
    }
    if (lang === "ja" && material[`${field}_ja`]) {
      return material[`${field}_ja`];
    }
    return material[field];
  };

  const handleDownload = async (material) => {
    try {
      setDownloading(material.id);
      const response = await api.get(
        `/lessons/${lessonId}/materials/${material.id}/download`,
        { responseType: "blob" }
      );

      // Create download using URL.createObjectURL and window.open
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Try modern approach first
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // For IE/Edge
        window.navigator.msSaveOrOpenBlob(new Blob([response.data]), material.file_name);
      } else {
        // For modern browsers - use a temporary link without DOM manipulation conflicts
        const link = document.createElement("a");
        link.href = url;
        link.download = material.file_name;
        
        // Trigger download without adding to DOM
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        link.dispatchEvent(event);
      }
      
      // Clean up the URL object
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);

      // Refresh materials to update download count
      fetchMaterials();
    } catch (error) {
      console.error("Error downloading material:", error);
      alert("Failed to download file. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes >= 1073741824) {
      return (bytes / 1073741824).toFixed(2) + " GB";
    } else if (bytes >= 1048576) {
      return (bytes / 1048576).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    }
    return bytes + " bytes";
  };

  const getFileIcon = (fileType) => {
    const type = fileType?.toLowerCase();
    if (["pdf"].includes(type)) return "📄";
    if (["doc", "docx"].includes(type)) return "📝";
    if (["xls", "xlsx"].includes(type)) return "📊";
    if (["ppt", "pptx"].includes(type)) return "📽️";
    if (["zip", "rar"].includes(type)) return "📦";
    if (["jpg", "jpeg", "png", "gif"].includes(type)) return "🖼️";
    return "📎";
  };

  if (loading) {
    return (
      <div className="mt-6 pt-6 border-t-2 border-blue-100">
        <div className="text-center py-4 text-gray-500">
          {t("materials.loading")}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t-2 border-blue-100">
        <div className="text-center py-4 text-red-500 text-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!materials || materials.length === 0) {
    return null; // Don't show section if no materials
  }

  return (
    <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t-2 border-blue-100">
      <h3 className="text-gray-900 font-bold text-base lg:text-lg mb-3 lg:mb-4 flex items-center gap-2">
        <span>📚</span>
        {t("materials.title")}
      </h3>
      <div className="space-y-2 lg:space-y-3">
        {materials && materials.length > 0 ? materials.filter(material => material).map((material) => (
          <div
            key={material.id || Math.random()}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100 hover:border-blue-300 transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="text-2xl lg:text-3xl shrink-0">
                {getFileIcon(material?.file_type)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm lg:text-base line-clamp-2">
                  {getLocalizedField(material, "title") || "Untitled"}
                </div>
                {getLocalizedField(material, "description") && (
                  <div className="text-xs lg:text-sm text-gray-600 line-clamp-2 mt-1">
                    {getLocalizedField(material, "description")}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 lg:gap-3 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="truncate">{material?.file_type?.toUpperCase() || "FILE"}</span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                      />
                    </svg>
                    <span className="truncate">{formatFileSize(material?.file_size || 0)}</span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span className="truncate">{material?.download_count || 0} {t("materials.downloads")}</span>
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDownload(material)}
              disabled={downloading === material.id}
              className="shrink-0 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white px-3 lg:px-4 py-2 rounded-lg font-semibold text-xs lg:text-sm transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-md touch-manipulation"
            >
              {downloading === material.id ? (
                <>
                  <svg
                    className="animate-spin h-3 w-3 lg:h-4 lg:w-4"
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
                  <span>{t("materials.downloading")}...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>{t("materials.download")}</span>
                </>
              )}
            </button>
          </div>
        )) : (
          <div className="text-center py-4 text-gray-500 text-sm">
            No materials available
          </div>
        )}
      </div>
    </div>
  );
}
