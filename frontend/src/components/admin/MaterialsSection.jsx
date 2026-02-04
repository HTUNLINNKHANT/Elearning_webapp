import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../lib/axios';
import MaterialModal from './MaterialModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function MaterialsSection({ lessonId }) {
  const { t } = useTranslation();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, [lessonId]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/lessons/${lessonId}/materials`);
      setMaterials(data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = () => {
    setSelectedMaterial(null);
    setShowMaterialModal(true);
  };

  const handleEditMaterial = (material) => {
    setSelectedMaterial(material);
    setShowMaterialModal(true);
  };

  const handleDeleteMaterial = (material) => {
    setSelectedMaterial(material);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/lessons/${lessonId}/materials/${selectedMaterial.id}`);
      fetchMaterials();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes >= 1073741824) {
      return (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      return (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    }
    return bytes + ' bytes';
  };

  const getFileIcon = (fileType) => {
    const type = fileType?.toLowerCase();
    if (['pdf'].includes(type)) return '📄';
    if (['doc', 'docx'].includes(type)) return '📝';
    if (['xls', 'xlsx'].includes(type)) return '📊';
    if (['ppt', 'pptx'].includes(type)) return '📽️';
    if (['zip', 'rar'].includes(type)) return '📦';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(type)) return '🖼️';
    return '📎';
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-500">Loading materials...</div>;
  }

  return (
    <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h5 className="font-semibold text-gray-700 flex items-center gap-2">
          <span>📚</span>
          {t('materials.title')} ({materials.length})
        </h5>
        <button
          onClick={handleAddMaterial}
          className="bg-purple-600 text-white px-3 py-1.5 rounded text-sm hover:bg-purple-700 flex items-center gap-1"
        >
          <span>+</span>
          {t('materials.addMaterial')}
        </button>
      </div>

      {materials.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          {t('materials.noMaterials')}
        </p>
      ) : (
        <div className="space-y-2">
          {materials.map((material) => (
            <div
              key={material.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{getFileIcon(material.file_type)}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{material.title}</div>
                  {material.description && (
                    <div className="text-sm text-gray-600 line-clamp-1">
                      {material.description}
                    </div>
                  )}
                  <div className="flex gap-3 text-xs text-gray-500 mt-1">
                    <span>{material.file_name}</span>
                    <span>•</span>
                    <span>{formatFileSize(material.file_size)}</span>
                    <span>•</span>
                    <span>{material.download_count} downloads</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditMaterial(material)}
                  className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm"
                >
                  {t('admin.edit')}
                </button>
                <button
                  onClick={() => handleDeleteMaterial(material)}
                  className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                >
                  {t('admin.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showMaterialModal && (
        <MaterialModal
          lessonId={lessonId}
          material={selectedMaterial}
          onClose={() => setShowMaterialModal(false)}
          onSuccess={() => {
            fetchMaterials();
            setShowMaterialModal(false);
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title={t('materials.deleteMaterial')}
          message={t('materials.confirmDelete')}
        />
      )}
    </div>
  );
}
