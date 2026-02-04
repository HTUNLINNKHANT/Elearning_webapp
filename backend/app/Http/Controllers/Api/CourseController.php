<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::with(['category', 'instructor', 'curriculums.lessons']);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('title_my', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('description_my', 'like', "%{$search}%");
            });
        }

        // Check if pagination is requested
        if ($request->has('paginate') || $request->has('page')) {
            $perPage = $request->input('per_page', 8); // Default 8 for public, can be overridden
            $courses = $query->orderBy('created_at', 'desc')->paginate($perPage);
            return response()->json($courses);
        }

        // Return all courses (fallback for non-paginated requests)
        $courses = $query->orderBy('created_at', 'desc')->get();
        return response()->json($courses);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'instructor_id' => 'nullable|exists:instructors,id',
            'title' => 'required|string|max:255',
            'title_my' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_my' => 'nullable|string',
            'duration_weeks' => 'required|integer',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:5120',
            'thumbnail' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/courses'), $imageName);
            $validated['image'] = '/uploads/courses/' . $imageName;
        }

        $course = Course::create($validated);

        return response()->json($course->load(['category', 'instructor']), 201);
    }

    public function show($identifier)
    {
        // Support both ID and slug
        $course = Course::with(['category', 'instructor', 'curriculums.lessons' => function($query) {
                // Hide video URLs for public view
                $query->select('id', 'curriculum_id', 'title', 'title_my', 
                              'content', 'content_my', 'type', 
                              'duration_minutes', 'order', 'is_free', 'created_at', 'updated_at');
            }])
            ->where(function($query) use ($identifier) {
                // If it's numeric, search by ID, otherwise by slug
                if (is_numeric($identifier)) {
                    $query->where('id', $identifier);
                } else {
                    $query->where('slug', $identifier);
                }
            })
            ->firstOrFail();
        
        return response()->json($course);
    }

    public function showForEnrolled(Request $request, $identifier)
    {
        $user = $request->user();
        
        // Support both ID and slug
        $course = Course::with(['category', 'instructor', 'curriculums.lessons'])
            ->where(function($query) use ($identifier) {
                if (is_numeric($identifier)) {
                    $query->where('id', $identifier);
                } else {
                    $query->where('slug', $identifier);
                }
            })
            ->firstOrFail();
        
        // Check if user is enrolled or is admin
        if (!$user->is_admin && !$course->students()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'message' => 'You must be enrolled in this course to access the content.'
            ], 403);
        }
        
        // Get completed lessons for this user
        $completedLessonIds = $user->completedLessons()
            ->wherePivot('completed', true)
            ->pluck('lesson_id')
            ->toArray();
        
        // Add completed status to each lesson
        foreach ($course->curriculums as $curriculum) {
            foreach ($curriculum->lessons as $lesson) {
                $lesson->is_completed = in_array($lesson->id, $completedLessonIds);
            }
        }
        
        return response()->json($course);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'instructor_id' => 'nullable|exists:instructors,id',
            'title' => 'string|max:255',
            'title_my' => 'nullable|string|max:255',
            'description' => 'string',
            'description_my' => 'nullable|string',
            'duration_weeks' => 'integer',
            'price' => 'numeric',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:5120',
            'thumbnail' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($course->image && file_exists(public_path($course->image))) {
                unlink(public_path($course->image));
            }
            
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/courses'), $imageName);
            $validated['image'] = '/uploads/courses/' . $imageName;
        } else {
            // Remove image from validated data if not uploading new one
            unset($validated['image']);
        }

        $course->update($validated);

        return response()->json($course->load(['category', 'instructor']));
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }

    public function enrollStudent(Request $request, $courseId)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $course = Course::findOrFail($courseId);
        
        if (!$course->students()->where('user_id', $validated['user_id'])->exists()) {
            $course->students()->attach($validated['user_id'], [
                'enrolled_at' => now(),
                'progress' => 0,
            ]);
            
            $course->increment('enrolled_count');
        }

        return response()->json(['message' => 'Student enrolled successfully']);
    }

    public function unenrollStudent($courseId, $userId)
    {
        $course = Course::findOrFail($courseId);
        $course->students()->detach($userId);
        $course->decrement('enrolled_count');

        return response()->json(['message' => 'Student unenrolled successfully']);
    }
}
