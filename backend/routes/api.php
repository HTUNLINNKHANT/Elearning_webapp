<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\CourseMaterialController;
use App\Http\Controllers\Api\CurriculumController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\InstructorController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SecureVideoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\Admin\StudentController;
use App\Http\Controllers\Api\Admin\CourseMaterialController as AdminCourseMaterialController;
use App\Http\Controllers\Api\Admin\BlogPostController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Password Reset
Route::post('/forgot-password', [\App\Http\Controllers\Api\PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [\App\Http\Controllers\Api\PasswordResetController::class, 'reset']);

// Public course and category access
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{course}', [CourseController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

// Public blog access
Route::get('/blog', [\App\Http\Controllers\Api\BlogController::class, 'index']);
Route::get('/blog/{slug}', [\App\Http\Controllers\Api\BlogController::class, 'show']);

// Public contact form
Route::post('/contact', [\App\Http\Controllers\Api\ContactController::class, 'store']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'update']);
    
    // Enrolled course access (with video URLs)
    Route::get('/enrolled/courses/{course}', [CourseController::class, 'showForEnrolled']);
    
    // Lesson Progress
    Route::post('/lessons/{lesson}/complete', [\App\Http\Controllers\Api\LessonProgressController::class, 'markComplete']);
    Route::post('/lessons/{lesson}/incomplete', [\App\Http\Controllers\Api\LessonProgressController::class, 'markIncomplete']);
    
    // Secure Video Access
    Route::get('/lessons/{lesson}/secure-video', [SecureVideoController::class, 'getSecureUrl']);
    Route::post('/videos/verify-token', [SecureVideoController::class, 'verifyToken']);
    
    // Enrollments
    Route::post('/enrollments', [EnrollmentController::class, 'enroll']);
    Route::get('/my-enrollments', [EnrollmentController::class, 'myEnrollments']);
    Route::put('/enrollments/{enrollment}/progress', [EnrollmentController::class, 'updateProgress']);
    
    // Course Materials (Student Access)
    Route::get('/lessons/{lesson}/materials', [CourseMaterialController::class, 'index']);
    Route::get('/lessons/{lesson}/materials/{material}/download', [CourseMaterialController::class, 'download']);
    
    // Admin routes
    Route::middleware('admin')->group(function () {
        // Dashboard
        Route::get('/admin/dashboard', [\App\Http\Controllers\Api\DashboardController::class, 'stats']);
        
        // Courses
        Route::apiResource('courses', CourseController::class)->except(['index', 'show']);
        Route::post('/courses/{course}/enroll', [CourseController::class, 'enrollStudent']);
        Route::delete('/courses/{course}/students/{user}', [CourseController::class, 'unenrollStudent']);
        
        // Categories (exclude index since it's public)
        Route::apiResource('categories', CategoryController::class)->except(['index']);
        
        // Instructors
        Route::apiResource('instructors', InstructorController::class);
        
        // Curriculums
        Route::get('/courses/{course}/curriculums', [CurriculumController::class, 'index']);
        Route::post('/courses/{course}/curriculums', [CurriculumController::class, 'store']);
        Route::get('/courses/{course}/curriculums/{curriculum}', [CurriculumController::class, 'show']);
        Route::put('/courses/{course}/curriculums/{curriculum}', [CurriculumController::class, 'update']);
        Route::delete('/courses/{course}/curriculums/{curriculum}', [CurriculumController::class, 'destroy']);
        
        // Lessons
        Route::get('/curriculums/{curriculum}/lessons', [LessonController::class, 'index']);
        Route::post('/curriculums/{curriculum}/lessons', [LessonController::class, 'store']);
        Route::get('/curriculums/{curriculum}/lessons/{lesson}', [LessonController::class, 'show']);
        Route::put('/curriculums/{curriculum}/lessons/{lesson}', [LessonController::class, 'update']);
        Route::delete('/curriculums/{curriculum}/lessons/{lesson}', [LessonController::class, 'destroy']);
        
        // Course Materials (Admin Management)
        Route::post('/lessons/{lesson}/materials', [AdminCourseMaterialController::class, 'store']);
        Route::put('/lessons/{lesson}/materials/{material}', [AdminCourseMaterialController::class, 'update']);
        Route::delete('/lessons/{lesson}/materials/{material}', [AdminCourseMaterialController::class, 'destroy']);
        Route::post('/lessons/{lesson}/materials/reorder', [AdminCourseMaterialController::class, 'reorder']);
        
        Route::get('/admin/enrollments', [EnrollmentController::class, 'allEnrollments']);
        Route::apiResource('users', UserController::class);
        
        // Student Management
        Route::get('/admin/students', [StudentController::class, 'index']);
        Route::post('/admin/students', [StudentController::class, 'store']);
        Route::get('/admin/students/{id}', [StudentController::class, 'show']);
        Route::put('/admin/students/{id}', [StudentController::class, 'update']);
        Route::delete('/admin/students/{id}', [StudentController::class, 'destroy']);
        Route::post('/admin/courses/{course}/enroll', [StudentController::class, 'enrollInCourse']);
        Route::delete('/admin/courses/{course}/students/{student}', [StudentController::class, 'unenrollFromCourse']);
        
        // Blog Management
        Route::apiResource('admin/blog-posts', BlogPostController::class);
        
        // Contact Management
        Route::get('/admin/contacts', [\App\Http\Controllers\Api\Admin\ContactController::class, 'index']);
        Route::get('/admin/contacts/{id}', [\App\Http\Controllers\Api\Admin\ContactController::class, 'show']);
        Route::put('/admin/contacts/{id}', [\App\Http\Controllers\Api\Admin\ContactController::class, 'update']);
        Route::delete('/admin/contacts/{id}', [\App\Http\Controllers\Api\Admin\ContactController::class, 'destroy']);
    });
});
