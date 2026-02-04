<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Get all students with their enrolled courses
     */
    public function index()
    {
        $students = User::where('role', 'student')
            ->with(['courses'])
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'email' => $student->email,
                    'avatar' => $student->avatar,
                    'created_at' => $student->created_at,
                    'courses' => $student->courses->map(function ($course) {
                        return [
                            'id' => $course->id,
                            'title' => $course->title,
                            'enrolled_at' => $course->pivot->enrolled_at,
                            'progress' => $course->pivot->progress,
                        ];
                    }),
                ];
            });

        return response()->json($students);
    }

    /**
     * Create a new student account
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $student = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'student',
        ]);

        return response()->json($student, 201);
    }

    /**
     * Get a specific student with their courses
     */
    public function show($id)
    {
        $student = User::where('role', 'student')
            ->with(['courses'])
            ->findOrFail($id);

        return response()->json([
            'id' => $student->id,
            'name' => $student->name,
            'email' => $student->email,
            'avatar' => $student->avatar,
            'created_at' => $student->created_at,
            'courses' => $student->courses->map(function ($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'enrolled_at' => $course->pivot->enrolled_at,
                    'progress' => $course->pivot->progress,
                ];
            }),
        ]);
    }

    /**
     * Update student information
     */
    public function update(Request $request, $id)
    {
        $student = User::where('role', 'student')->findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $student->update($validated);

        return response()->json($student);
    }

    /**
     * Delete a student account
     */
    public function destroy($id)
    {
        $student = User::where('role', 'student')->findOrFail($id);
        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }

    /**
     * Enroll a student in a course
     */
    public function enrollInCourse(Request $request, $courseId)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $course = Course::findOrFail($courseId);
        $student = User::where('role', 'student')->findOrFail($validated['user_id']);

        // Check if already enrolled
        if ($course->students()->where('user_id', $student->id)->exists()) {
            return response()->json(['message' => 'Student is already enrolled in this course'], 400);
        }

        // Enroll the student
        $course->students()->attach($student->id, [
            'enrolled_at' => now(),
            'progress' => 0,
        ]);

        // Increment enrolled count
        $course->increment('enrolled_count');

        return response()->json(['message' => 'Student enrolled successfully']);
    }

    /**
     * Unenroll a student from a course
     */
    public function unenrollFromCourse($courseId, $studentId)
    {
        $course = Course::findOrFail($courseId);
        $student = User::where('role', 'student')->findOrFail($studentId);

        // Check if enrolled
        if (!$course->students()->where('user_id', $student->id)->exists()) {
            return response()->json(['message' => 'Student is not enrolled in this course'], 400);
        }

        // Unenroll the student
        $course->students()->detach($student->id);

        // Decrement enrolled count
        $course->decrement('enrolled_count');

        return response()->json(['message' => 'Student unenrolled successfully']);
    }
}
