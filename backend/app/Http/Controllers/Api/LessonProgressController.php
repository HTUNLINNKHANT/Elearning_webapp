<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Course;
use Illuminate\Http\Request;

class LessonProgressController extends Controller
{
    public function markComplete(Request $request, $lessonId)
    {
        $user = $request->user();
        $lesson = Lesson::findOrFail($lessonId);

        // Check if user is enrolled in the course
        $course = $lesson->curriculum->course;
        if (!$user->is_admin && !$course->students()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'message' => 'You must be enrolled in this course.'
            ], 403);
        }

        // Mark lesson as completed
        $user->completedLessons()->syncWithoutDetaching([
            $lessonId => [
                'completed' => true,
                'completed_at' => now()
            ]
        ]);

        // Update course progress
        $this->updateCourseProgress($user, $course);

        return response()->json([
            'message' => 'Lesson marked as complete',
            'progress' => $this->getCourseProgress($user, $course)
        ]);
    }

    public function markIncomplete(Request $request, $lessonId)
    {
        $user = $request->user();
        $lesson = Lesson::findOrFail($lessonId);

        // Mark lesson as incomplete
        $user->completedLessons()->syncWithoutDetaching([
            $lessonId => [
                'completed' => false,
                'completed_at' => null
            ]
        ]);

        // Update course progress
        $course = $lesson->curriculum->course;
        $this->updateCourseProgress($user, $course);

        return response()->json([
            'message' => 'Lesson marked as incomplete',
            'progress' => $this->getCourseProgress($user, $course)
        ]);
    }

    private function updateCourseProgress($user, $course)
    {
        $totalLessons = 0;
        $completedLessons = 0;

        foreach ($course->curriculums as $curriculum) {
            foreach ($curriculum->lessons as $lesson) {
                $totalLessons++;
                if ($user->completedLessons()->where('lesson_id', $lesson->id)->wherePivot('completed', true)->exists()) {
                    $completedLessons++;
                }
            }
        }

        $progress = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;

        $user->courses()->updateExistingPivot($course->id, [
            'progress' => $progress,
            'completed_at' => $progress === 100 ? now() : null
        ]);

        return $progress;
    }

    private function getCourseProgress($user, $course)
    {
        $enrollment = $user->courses()->where('course_id', $course->id)->first();
        return $enrollment ? $enrollment->pivot->progress : 0;
    }
}
