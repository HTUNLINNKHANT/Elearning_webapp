import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../lib/axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';

const Students = () => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showUnenrollModal, setShowUnenrollModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [unenrollData, setUnenrollData] = useState({ studentId: null, courseId: null, courseName: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await api.get('/admin/students');
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const handleEnrollStudent = async () => {
    if (!selectedStudent || !selectedCourse) return;

    try {
      await api.post(`/admin/courses/${selectedCourse}/enroll`, {
        user_id: selectedStudent.id
      });
      setSnackbar({ open: true, message: 'Student enrolled successfully!', severity: 'success' });
      setShowEnrollModal(false);
      setSelectedStudent(null);
      setSelectedCourse('');
      fetchStudents();
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error.response?.data?.message || 'Failed to enroll student', 
        severity: 'error' 
      });
    }
  };

  const handleUnenrollClick = (studentId, courseId, courseName) => {
    setUnenrollData({ studentId, courseId, courseName });
    setShowUnenrollModal(true);
  };

  const confirmUnenroll = async () => {
    try {
      await api.delete(`/admin/courses/${unenrollData.courseId}/students/${unenrollData.studentId}`);
      setSnackbar({ open: true, message: 'Student unenrolled successfully!', severity: 'success' });
      setShowUnenrollModal(false);
      fetchStudents();
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error.response?.data?.message || 'Failed to unenroll student', 
        severity: 'error' 
      });
      setShowUnenrollModal(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.students')}</h1>
          <p className="text-gray-600 mt-1">Manage student enrollments and access</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {student.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {student.courses && student.courses.length > 0 ? (
                          student.courses.map((course) => (
                            <div
                              key={course.id}
                              className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                            >
                              <span>{course.title}</span>
                              <button
                                onClick={() => handleUnenrollClick(student.id, course.id, course.title)}
                                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No courses enrolled</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowEnrollModal(true);
                        }}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Enroll in Course
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enroll Student Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl transform transition-all animate-slideUp">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Enroll Student in Course</h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowEnrollModal(false);
                    setSelectedStudent(null);
                    setSelectedCourse('');
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Student
                  </label>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {selectedStudent?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{selectedStudent?.name}</p>
                        <p className="text-sm text-gray-600">{selectedStudent?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <FormControl fullWidth>
                    <InputLabel id="course-select-label">Select Course *</InputLabel>
                    <Select
                      labelId="course-select-label"
                      id="course-select"
                      value={selectedCourse}
                      label="Select Course *"
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#3b82f6',
                          borderWidth: '2px',
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Choose a course...</em>
                      </MenuItem>
                      {courses.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">{course.title}</span>
                            <span className="ml-4 text-blue-600 font-semibold">{course.price?.toLocaleString()} Ks</span>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <p className="mt-2 text-xs text-gray-500">
                    Select the course that the student has paid for
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEnrollModal(false);
                    setSelectedStudent(null);
                    setSelectedCourse('');
                  }}
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnrollStudent}
                  disabled={!selectedCourse}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md"
                >
                  Enroll Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unenroll Confirmation Modal */}
      {showUnenrollModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl transform transition-all animate-slideUp">
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Unenroll Student?
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to unenroll this student from <span className="font-semibold text-gray-900">"{unenrollData.courseName}"</span>? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUnenrollModal(false)}
                  className="flex-1 px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUnenroll}
                  className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  Yes, Unenroll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      </div>
    </AdminLayout>
  );
};

export default Students;
