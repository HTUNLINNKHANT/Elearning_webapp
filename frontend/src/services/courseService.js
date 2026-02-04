import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const courseService = {
  // Courses
  getAllCourses: async (params = {}) => {
    const response = await axios.get(`${API_URL}/courses`, { params });
    return response.data;
  },

  getCourse: async (id) => {
    const response = await axios.get(`${API_URL}/courses/${id}`);
    return response.data;
  },

  createCourse: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      // Handle different data types properly
      if (value !== null && value !== undefined && value !== "") {
        // Convert boolean to string for FormData
        if (typeof value === "boolean") {
          formData.append(key, value ? "1" : "0");
        } else {
          formData.append(key, value);
        }
      }
    });

    const response = await axios.post(`${API_URL}/courses`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateCourse: async (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      // Handle different data types properly
      if (value !== null && value !== undefined && value !== "") {
        // Convert boolean to string for FormData
        if (typeof value === "boolean") {
          formData.append(key, value ? "1" : "0");
        } else {
          formData.append(key, value);
        }
      }
    });
    formData.append("_method", "PUT");

    const response = await axios.post(`${API_URL}/courses/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteCourse: async (id) => {
    const response = await axios.delete(`${API_URL}/courses/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  enrollStudent: async (courseId, userId) => {
    const response = await axios.post(
      `${API_URL}/courses/${courseId}/enroll`,
      { user_id: userId },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  unenrollStudent: async (courseId, userId) => {
    const response = await axios.delete(
      `${API_URL}/courses/${courseId}/students/${userId}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Categories
  getAllCategories: async () => {
    const response = await axios.get(`${API_URL}/categories`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  createCategory: async (data) => {
    const response = await axios.post(`${API_URL}/categories`, data, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  updateCategory: async (id, data) => {
    const response = await axios.put(`${API_URL}/categories/${id}`, data, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axios.delete(`${API_URL}/categories/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Instructors
  getAllInstructors: async () => {
    const response = await axios.get(`${API_URL}/instructors`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  createInstructor: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== null && value !== undefined && value !== "") {
        if (typeof value === "boolean") {
          formData.append(key, value ? "1" : "0");
        } else {
          formData.append(key, value);
        }
      }
    });

    const response = await axios.post(`${API_URL}/instructors`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateInstructor: async (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== null && value !== undefined && value !== "") {
        if (typeof value === "boolean") {
          formData.append(key, value ? "1" : "0");
        } else {
          formData.append(key, value);
        }
      }
    });
    formData.append("_method", "PUT");

    const response = await axios.post(
      `${API_URL}/instructors/${id}`,
      formData,
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  deleteInstructor: async (id) => {
    const response = await axios.delete(`${API_URL}/instructors/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Curriculums
  getCourseCurriculums: async (courseId) => {
    const response = await axios.get(
      `${API_URL}/courses/${courseId}/curriculums`,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  createCurriculum: async (courseId, data) => {
    const response = await axios.post(
      `${API_URL}/courses/${courseId}/curriculums`,
      data,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  updateCurriculum: async (courseId, curriculumId, data) => {
    const response = await axios.put(
      `${API_URL}/courses/${courseId}/curriculums/${curriculumId}`,
      data,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  deleteCurriculum: async (courseId, curriculumId) => {
    const response = await axios.delete(
      `${API_URL}/courses/${courseId}/curriculums/${curriculumId}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Lessons
  getCurriculumLessons: async (curriculumId) => {
    const response = await axios.get(
      `${API_URL}/curriculums/${curriculumId}/lessons`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  createLesson: async (curriculumId, data) => {
    const response = await axios.post(
      `${API_URL}/curriculums/${curriculumId}/lessons`,
      data,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  updateLesson: async (curriculumId, lessonId, data) => {
    const response = await axios.put(
      `${API_URL}/curriculums/${curriculumId}/lessons/${lessonId}`,
      data,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  deleteLesson: async (curriculumId, lessonId) => {
    const response = await axios.delete(
      `${API_URL}/curriculums/${curriculumId}/lessons/${lessonId}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },
};
