<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function stats()
    {
        try {
            // Total counts - simple and safe
            $totalCourses = Course::count();
            $totalStudents = User::where('role', 'student')->count();
            $totalCategories = Category::count();
            $totalEnrollments = DB::table('course_user')->count();
            
            // Revenue calculation - safe with coalesce
            $totalRevenue = (int) DB::table('course_user')
                ->join('courses', 'course_user.course_id', '=', 'courses.id')
                ->sum(DB::raw('COALESCE(courses.price, 0)'));
            
            // Recent enrollments - simplified
            $recentEnrollments = [];
            try {
                $recentEnrollments = DB::table('course_user')
                    ->join('users', 'course_user.user_id', '=', 'users.id')
                    ->join('courses', 'course_user.course_id', '=', 'courses.id')
                    ->select(
                        'users.name as student_name',
                        'courses.title as course_title',
                        'course_user.enrolled_at',
                        'courses.price'
                    )
                    ->whereNotNull('course_user.enrolled_at')
                    ->orderBy('course_user.enrolled_at', 'desc')
                    ->limit(10)
                    ->get()
                    ->toArray();
            } catch (\Exception $e) {
                Log::warning('Recent enrollments query failed: ' . $e->getMessage());
            }
            
            // Popular courses - load with category
            $popularCourses = [];
            try {
                $popularCourses = Course::select('id', 'title', 'category_id')
                    ->withCount('students')
                    ->with('category:id,name')
                    ->orderBy('students_count', 'desc')
                    ->limit(5)
                    ->get()
                    ->toArray();
            } catch (\Exception $e) {
                Log::warning('Popular courses query failed: ' . $e->getMessage());
            }
            
            // Category distribution
            $categoryStats = [];
            try {
                $categoryStats = DB::table('categories')
                    ->leftJoin('courses', 'categories.id', '=', 'courses.category_id')
                    ->select('categories.name', DB::raw('COUNT(courses.id) as count'))
                    ->groupBy('categories.id', 'categories.name')
                    ->having(DB::raw('COUNT(courses.id)'), '>', 0)
                    ->get()
                    ->toArray();
            } catch (\Exception $e) {
                Log::warning('Category stats query failed: ' . $e->getMessage());
            }
            
            // Monthly enrollments - simplified for PostgreSQL
            $monthlyEnrollments = [];
            try {
                $monthlyEnrollments = DB::table('course_user')
                    ->select(
                        DB::raw("TO_CHAR(enrolled_at, 'YYYY-MM') as month"),
                        DB::raw('COUNT(*) as count')
                    )
                    ->whereNotNull('enrolled_at')
                    ->where('enrolled_at', '>=', now()->subMonths(6))
                    ->groupBy(DB::raw("TO_CHAR(enrolled_at, 'YYYY-MM')"))
                    ->orderBy('month')
                    ->get()
                    ->toArray();
            } catch (\Exception $e) {
                Log::warning('Monthly enrollments query failed: ' . $e->getMessage());
            }
            
            return response()->json([
                'stats' => [
                    'total_courses' => $totalCourses,
                    'total_students' => $totalStudents,
                    'total_categories' => $totalCategories,
                    'total_enrollments' => $totalEnrollments,
                    'total_revenue' => $totalRevenue,
                ],
                'recent_enrollments' => $recentEnrollments,
                'popular_courses' => $popularCourses,
                'category_stats' => $categoryStats,
                'monthly_enrollments' => $monthlyEnrollments,
            ]);
        } catch (\Exception $e) {
            Log::error('Dashboard stats error: ' . $e->getMessage());
            Log::error('Error line: ' . $e->getLine());
            Log::error('Error file: ' . $e->getFile());
            
            // Return error with details for debugging
            return response()->json([
                'message' => 'Failed to fetch dashboard statistics',
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => basename($e->getFile()),
                'stats' => [
                    'total_courses' => 0,
                    'total_students' => 0,
                    'total_categories' => 0,
                    'total_enrollments' => 0,
                    'total_revenue' => 0,
                ],
                'recent_enrollments' => [],
                'popular_courses' => [],
                'category_stats' => [],
                'monthly_enrollments' => [],
            ], 500);
        }
    }
}
