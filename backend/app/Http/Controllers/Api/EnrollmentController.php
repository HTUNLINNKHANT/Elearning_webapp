<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function enroll(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $enrollment = Enrollment::firstOrCreate([
            'user_id' => $request->user()->id,
            'course_id' => $request->course_id,
        ]);

        $enrollment->load('course');

        return response()->json($enrollment, 201);
    }

    public function myEnrollments(Request $request)
    {
        $user = $request->user();

        // Get courses from the pivot table (course_user)
        $enrolledCourses = $user->courses()
            ->with(['category', 'instructor', 'curriculums.lessons'])
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'course' => [
                        'id' => $course->id,
                        'title' => $course->title,
                        'title_my' => $course->title_my,
                        'title_ja' => $course->title_ja,
                        'description' => $course->description,
                        'description_my' => $course->description_my,
                        'description_ja' => $course->description_ja,
                        'slug' => $course->slug,
                        'price' => $course->price,
                        'duration_weeks' => $course->duration_weeks,
                        'total_lessons' => $course->total_lessons,
                        'image' => $course->image,
                        'thumbnail' => $course->thumbnail,
                        'category' => $course->category,
                        'instructor' => $course->instructor,
                    ],
                    'enrolled_at' => $course->pivot->enrolled_at,
                    'progress' => $course->pivot->progress ?? 0,
                    'completed_at' => $course->pivot->completed_at,
                ];
            });

        return response()->json($enrolledCourses);
    }

    public function updateProgress(Request $request, Enrollment $enrollment)
    {
        if ($enrollment->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'progress' => 'required|integer|min:0|max:100',
        ]);

        $enrollment->update(['progress' => $request->progress]);

        return response()->json($enrollment);
    }

    public function allEnrollments()
    {
        $enrollments = Enrollment::with(['user', 'course'])->get();

        return response()->json($enrollments);
    }
}
