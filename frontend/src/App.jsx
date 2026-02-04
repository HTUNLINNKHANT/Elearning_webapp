import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context";
import { ToastProvider } from "./contexts/ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import CourseLearning from "./pages/CourseLearning";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AdminCourses from "./pages/admin/Courses";
import CourseDetail from "./pages/admin/CourseDetail";
import Categories from "./pages/admin/Categories";
import Instructors from "./pages/admin/Instructors";
import Students from "./pages/admin/Students";
import BlogPosts from "./pages/admin/BlogPosts";
import Contacts from "./pages/admin/Contacts";
import Settings from "./pages/admin/Settings";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <BackToTop />
        <Routes>
          {/* Public routes with Navbar */}
          <Route
            path="/"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Home />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <About />
                </main>
                <Footer />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/courses"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Courses />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/blog"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Blog />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <BlogDetail />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Contact />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <MyCourses />
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:courseId/learn"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <CourseLearning />
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <Profile />
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
          {/* Admin routes - protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <CourseDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/instructors"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Instructors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog-posts"
            element={
              <ProtectedRoute requireAdmin={true}>
                <BlogPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
